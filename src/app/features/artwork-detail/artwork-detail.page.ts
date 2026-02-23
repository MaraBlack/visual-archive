import { Component, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { ITEMS } from '../collection/mock/collection-data';

@Component({
    selector: 'app-artwork-detail',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './artwork-detail.page.html',
    styleUrls: ['./artwork-detail.page.css']
})
export class ArtworkDetailPage implements OnDestroy {
    item: any = null;
    itemsForKey: any[] = [];
    index = 0;
    sub: Subscription;
    contextKey: string = 'all';

    constructor(private route: ActivatedRoute, private router: Router) {
        this.sub = this.route.paramMap.subscribe((pm: ParamMap) => {
            const key = (pm.get('key') || '').trim().toLowerCase();
            const id = pm.get('id');
            this.contextKey = key || 'all';

            // Use the key param to determine the current filtered set; fall back to all items
            if (this.contextKey !== 'all') {
                this.itemsForKey = ITEMS.filter(i => i.key === this.contextKey);
            } else {
                this.itemsForKey = ITEMS.slice();
            }

            this.index = this.itemsForKey.findIndex(i => i.id === id);
            if (this.index === -1) {
                // not found -> go back to collection
                this.router.navigate(['/collection', 'all']);
                return;
            }
            this.item = this.itemsForKey[this.index];
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
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
        this.router.navigate(['/collection', this.contextKey, it.id]);
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
