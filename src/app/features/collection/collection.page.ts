import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CollectionItem, CollectionService } from './services/collection.service';

@Component({
    selector: 'app-collection',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './collection.page.html',
    styleUrls: ['./collection.page.css']
})
export class CollectionPage {
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly destroyRef = inject(DestroyRef);
    private readonly collectionService = inject(CollectionService);

    private requestContext = 0;

    items: CollectionItem[] = [];
    selectedKey: string = 'all';

    keys: string[] = [];

    page = 1;
    pageSize = 9;
    hasMore = true;
    loading = false;
    error: string | null = null;

    constructor() {
        this.loadKeys();

        this.route.paramMap
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(params => {
                const key = (params.get('key') || '').trim().toLowerCase();

                if (!key || key === 'all') {
                    this.selectedKey = 'all';
                    this.resetAndLoad();
                    return;
                }

                // Route param might be invalid; we validate once keys load.
                this.selectedKey = key;
                this.resetAndLoad();
            });
    }

    setFilter(key: string) {
        const normalized = (key || '').trim().toLowerCase();
        const next = !normalized || normalized === 'all' ? 'all' : normalized;

        // Route-based filtering (canonical):
        // - All => /collection/all
        // - Specific => /collection/:key
        this.router.navigate(['/collection', next]);
    }

    loadMore() {
        if (this.loading || !this.hasMore) return;

        const ctx = this.requestContext;
        this.loading = true;
        this.error = null;

        const key = this.selectedKey === 'all' ? null : this.selectedKey;

        this.collectionService
            .getItems({ key, page: this.page, pageSize: this.pageSize })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: res => {
                    // Ignore stale responses (e.g., user switched filter mid-request)
                    if (ctx !== this.requestContext) return;
                    this.items = [...this.items, ...res.items];
                    this.hasMore = res.hasMore;
                    this.page = res.page + 1;
                    this.loading = false;
                },
                error: () => {
                    if (ctx !== this.requestContext) return;
                    this.loading = false;
                    this.error = 'Failed to load items.';
                }
            });
    }

    private resetAndLoad() {
        this.requestContext += 1;
        this.items = [];
        this.page = 1;
        this.hasMore = true;
        this.loading = false;
        this.error = null;
        this.loadMore();
    }

    private loadKeys() {
        this.collectionService
            .getKeys()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: keys => {
                    this.keys = keys;

                    // If user navigates directly to an unknown key, normalize to /collection/all.
                    if (this.selectedKey !== 'all' && this.keys.length && !this.keys.includes(this.selectedKey)) {
                        this.router.navigate(['/collection', 'all']);
                    }
                },
                error: () => {
                    // Non-blocking: filters will still work via manual route entry.
                    this.keys = [];
                }
            });
    }
}
