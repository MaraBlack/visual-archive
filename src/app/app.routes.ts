import { Routes } from '@angular/router';
import { HomePage } from './features/home/home.page';
import { CollectionPage } from './features/collection/collection.page';
import { ArtworkDetailPage } from './features/artwork-detail/artwork-detail.page';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomePage }
    , { path: 'collection', component: CollectionPage }
    , { path: 'collection/:key/:id', component: ArtworkDetailPage }
];
