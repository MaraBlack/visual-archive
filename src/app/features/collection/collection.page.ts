import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ITEMS } from './collection-data';

@Component({
    selector: 'app-collection',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './collection.page.html',
    styleUrls: ['./collection.page.css']
})
export class CollectionPage {
    items = ITEMS;
    selectedKey: string = 'all';

    get keys() {
        const set = new Set(this.items.map(i => i.key));
        return Array.from(set);
    }

    setFilter(key: string) {
        this.selectedKey = key;
    }

    get filteredItems() {
        if (!this.selectedKey || this.selectedKey === 'all') return this.items;
        return this.items.filter(i => i.key === this.selectedKey);
    }
}
