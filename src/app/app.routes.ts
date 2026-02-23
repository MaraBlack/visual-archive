import { Routes } from '@angular/router';
import { HomePage } from './features/home/home.page';
import { CollectionPage } from './features/collection/collection.page';
import { ArtworkDetailPage } from './features/artwork-detail/artwork-detail.page';
import { AboutPage } from './features/about/about.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomePage },
    { path: 'collection', redirectTo: 'collection/all', pathMatch: 'full' },
    { path: 'collection/:key', component: CollectionPage },
    { path: 'collection/:key/:id', component: ArtworkDetailPage },
    { path: 'about', component: AboutPage },
];
