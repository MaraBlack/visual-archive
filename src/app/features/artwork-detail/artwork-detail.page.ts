import { Component, HostListener, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  ParamMap,
} from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CollectionService } from '../../core/services/collection.service';
import { CollectionItem } from '../../core/models/models';

@Component({
  selector: 'app-artwork-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './artwork-detail.page.html',
  styleUrls: ['./artwork-detail.page.css'],
})
export class ArtworkDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly collectionService = inject(CollectionService);

  item: CollectionItem | null = null;
  itemsForKey: CollectionItem[] = [];
  index = 0;
  contextKey: string = 'all';

  constructor() {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((pm: ParamMap) => {
        const key = (pm.get('key') || '').trim().toLowerCase();
        const id = pm.get('id');
        this.contextKey = key || 'all';

        if (!id) {
          this.router.navigate(['/collection', this.contextKey]);
          return;
        }

        // Load all items for this key from Firestore, then find the current one by id
        const effectiveKey = this.contextKey === 'all' ? null : this.contextKey;

        this.collectionService
          .getAllForKey(effectiveKey)
          .subscribe({
            next: (items) => {
              this.itemsForKey = items;
              this.index = this.itemsForKey.findIndex((i) => i.id === id);

              if (this.index === -1) {
                // old behavior:
                // this.router.navigate(['/collection', this.contextKey]);
                // new behavior:
                this.router.navigate(['/not-found'], {
                  queryParams: {
                    fromKey: this.contextKey || 'all',
                  },
                });
                return;
              }

              this.item = this.itemsForKey[this.index];
            },
            error: (err) => {
              console.error('[ArtworkDetail] Failed to load items', err);
              this.router.navigate(['/not-found']);
            },
          });
      });

  }

  prev() {
    if (this.index > 0) {
      this.index -= 1;
      this.navigateToIndex();
    }
  }

  next() {
    if (this.index < this.itemsForKey.length - 1) {
      this.index += 1;
      this.navigateToIndex();
    }
  }

  navigateToIndex() {
    const it = this.itemsForKey[this.index];
    this.item = it;
    // Keep URL in sync with the new id
    this.router.navigate(['/collection', this.contextKey, it.id], {
      replaceUrl: true,
    });
  }

  goBack() {
    this.router.navigate(['/collection', this.contextKey || 'all']);
  }

  @HostListener('window:keydown', ['$event'])
  handleKey(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') this.prev();
    if (e.key === 'ArrowRight') this.next();
  }
}
