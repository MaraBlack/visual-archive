import {
  Component,
  DestroyRef,
  ElementRef,
  ViewChild,
  inject,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CollectionItem } from '../../core/models/models';
import { CollectionService } from '../../core/services/collection.service';

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
  private readonly zone = inject(NgZone);

  // Infinite scroll sentinel
  @ViewChild('infiniteAnchor') infiniteAnchor?: ElementRef<HTMLDivElement>;
  private intersectionObserver?: IntersectionObserver;

  // Request context to ignore stale responses
  private requestContext = 0;

  // State
  keys: string[] = [];
  selectedKey: string = 'all';

  // all items for current filter (from Firestore)
  private allItems: CollectionItem[] = [];

  // items currently visible in the grid
  items: CollectionItem[] = [];

  pageSize = 9;
  hasMore = true;
  loading = false;
  error: string | null = null;

  // progress bar
  total = 0;
  loadedCount = 0;

  constructor() {
    this.loadKeys();

    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const key = (params.get('key') || '').trim().toLowerCase();
        this.selectedKey = !key || key === 'all' ? 'all' : key;
        this.loadForKey(this.selectedKey);
      });
  }

  // Filter click
  setFilter(key: string) {
    const normalized = (key || '').trim().toLowerCase();
    const next = !normalized || normalized === 'all' ? 'all' : normalized;
    this.router.navigate(['/collection', next]);
  }

  // Called by infinite scroll sentinel
  loadMoreChunk() {
    if (this.loading || !this.hasMore) return;

    const start = this.loadedCount;
    const end = start + this.pageSize;
    const nextSlice = this.allItems.slice(start, end);

    if (nextSlice.length === 0) {
      this.hasMore = false;
      return;
    }

    this.items = [...this.items, ...nextSlice];
    this.loadedCount = this.items.length;
    this.hasMore = this.loadedCount < this.total;
  }

  // Load all items for a filter (one Firestore call)
  private loadForKey(key: string) {
    this.requestContext += 1;
    const ctx = this.requestContext;

    this.loading = true;
    this.error = null;
    this.items = [];
    this.allItems = [];
    this.total = 0;
    this.loadedCount = 0;
    this.hasMore = true;

    const effectiveKey = key === 'all' ? null : key;

    this.collectionService
      .getItemsForKey(effectiveKey)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (all) => {
          if (ctx !== this.requestContext) return;

          this.allItems = all;
          this.total = all.length;
          this.items = [];
          this.loadedCount = 0;
          this.hasMore = this.total > 0;

          // load first chunk into the grid
          this.loading = false;
          this.loadMoreChunk();

          // set up infinite scroll after first render
          setTimeout(() => this.setupObserver(), 0);
        },
        error: (err) => {
          console.error('[Collection] Failed to load items', err);
          if (ctx !== this.requestContext) return;
          this.loading = false;
          this.error = 'Failed to load items.';
          this.hasMore = false;
        },
      });
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

  // IntersectionObserver for infinite scroll
  private setupObserver() {
    if (!this.infiniteAnchor) return;

    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }

    this.zone.runOutsideAngular(() => {
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            this.zone.run(() => {
              if (!this.loading && this.hasMore) {
                this.loadMoreChunk();
              }
            });
          }
        },
        {
          root: null,
          rootMargin: '0px 0px 200px 0px',
          threshold: 0,
        }
      );

      if (this.infiniteAnchor?.nativeElement) {
        this.intersectionObserver.observe(this.infiniteAnchor.nativeElement);
      }
    });
  }

  ngOnDestroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }
}