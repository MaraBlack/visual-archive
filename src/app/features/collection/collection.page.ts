// collection.page.ts (only key changes)
import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CollectionService } from '../../core/services/collection.service';
import { CollectionItem } from '../../core/models/models';
import { DocumentSnapshot, DocumentData } from 'firebase/firestore';

@Component({
    selector: 'app-collection',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './collection.page.html',
    styleUrls: ['./collection.page.css'],
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

    pageSize = 9;
    hasMore = true;
    loading = false;
    error: string | null = null;

    cursor: DocumentSnapshot<DocumentData> | null = null;

    constructor() {
        this.loadKeys();

        this.route.paramMap
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((params) => {
                const key = (params.get('key') || '').trim().toLowerCase();
                this.selectedKey = !key || key === 'all' ? 'all' : key;
                this.resetAndLoad();
            });
    }

    setFilter(key: string) {
        const normalized = (key || '').trim().toLowerCase();
        const next = !normalized || normalized === 'all' ? 'all' : normalized;
        this.router.navigate(['/collection', next]);
    }

    loadMore() {
        if (this.loading || !this.hasMore) return;

        const ctx = this.requestContext;
        this.loading = true;
        this.error = null;

        const key = this.selectedKey === 'all' ? null : this.selectedKey;

        this.collectionService
            .getItemsPage({ key, pageSize: this.pageSize, cursor: this.cursor })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (res) => {
                    if (ctx !== this.requestContext) return;
                    this.items = [...this.items, ...res.items];
                    this.cursor = res.cursor;
                    this.hasMore = res.hasMore;
                    this.loading = false;
                },
                error: (err) => {
                    if (ctx !== this.requestContext) return;
                    console.error('[Collection] loadMore error', err);
                    this.loading = false;
                    this.error = 'Failed to load items.';
                },
            });
    }

    private resetAndLoad() {
        this.requestContext += 1;
        this.items = [];
        this.cursor = null;
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
                next: (keys) => (this.keys = keys),
                error: () => (this.keys = []),
            });
    }
}
