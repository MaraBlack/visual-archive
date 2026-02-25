import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../../../firebase.config';
import { CollectionItem } from '../models/models';


@Injectable({ providedIn: 'root' })
export class CollectionService {
  private readonly colRef = collection(db, 'artworks');

  /** Load distinct keys for filters (ALL, DIGITAL, …) */
  getKeys(): Observable<string[]> {
    return from(getDocs(this.colRef)).pipe(
      map((snap) => {
        const set = new Set<string>();
        snap.forEach((doc) => {
          const data = doc.data() as any;
          const key = (data.key ?? '').toString().trim().toLowerCase();
          if (key) set.add(key);
        });
        return Array.from(set).sort();
      })
    );
  }

  getAllForKey(key: string | null): Observable<CollectionItem[]> {
    // same behavior as getItemsForKey for now
    return this.getItemsForKey(key);
  }

  /**
   * Load ALL artworks for a given key.
   * - key === null or 'all' => return all artworks
   * - otherwise => only items with that key
   *
   * We then do pagination on the client.
   */
  getItemsForKey(key: string | null): Observable<CollectionItem[]> {
    const normalizedKey = (key ?? '').trim().toLowerCase();

    const constraints = [];
    if (normalizedKey && normalizedKey !== 'all') {
      constraints.push(where('key', '==', normalizedKey));
    }

    const q = query(
      this.colRef,
      ...constraints,
      orderBy('createdAt', 'desc') // make sure you set createdAt when saving in admin
    );

    return from(getDocs(q)).pipe(
      map((snap) =>
        snap.docs.map((docSnap) => {
          const data = docSnap.data() as any;
          return {
            id: docSnap.id,
            title: data.title ?? '',
            key: (data.key ?? '').toString().trim().toLowerCase(),
            img: data.imageUrl,
            date: data.date ?? '',
          } as CollectionItem;
        })
      )
    );
  }
}