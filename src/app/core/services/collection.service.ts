// src/app/pages/collection/services/collection.service.ts
import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  QueryConstraint,
  DocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { CollectionItem } from '../models/models';
import { db } from '../../../../firebase.config';

export interface FirestorePage<T> {
  items: T[];
  hasMore: boolean;
  cursor: DocumentSnapshot<DocumentData> | null;
}

@Injectable({ providedIn: 'root' })
export class CollectionService {
  private readonly collectionName = 'artworks';

  /** Distinct keys */
  getKeys(): Observable<string[]> {
    return from(getDocs(collection(db, this.collectionName))).pipe(
      map((snap) => {
        const set = new Set<string>();
        snap.forEach((d) => {
          const data = d.data() as any;
          const k = (data.key || '').toString().trim().toLowerCase();
          if (k) set.add(k);
        });
        return Array.from(set).sort();
      })
    );
  }

  /** Paged items for collection page */
  getItemsPage(args: {
    key?: string | null;
    pageSize: number;
    cursor?: DocumentSnapshot<DocumentData> | null;
  }): Observable<FirestorePage<CollectionItem>> {
    const { key, pageSize, cursor } = args;

    const colRef = collection(db, this.collectionName);
    const constraints: QueryConstraint[] = [];

    const normalizedKey = (key || '').trim().toLowerCase();
    if (normalizedKey && normalizedKey !== 'all') {
      constraints.push(where('key', '==', normalizedKey));
    }

    constraints.push(orderBy('createdAt', 'desc'));
    if (cursor) constraints.push(startAfter(cursor));
    constraints.push(limit(pageSize));

    const q = query(colRef, ...constraints);

    return from(getDocs(q)).pipe(
      map((snap) => {
        const items: CollectionItem[] = snap.docs.map((docSnap) => {
          const data = docSnap.data() as any;
          return {
            id: docSnap.id,
            title: data.title ?? '',
            key: (data.key ?? '').toString().trim().toLowerCase(),
            img: data.imageUrl,
            date: data.date ?? '',
          } as CollectionItem;
        });

        const last = snap.docs.length ? snap.docs[snap.docs.length - 1] : null;

        return {
          items,
          hasMore: snap.docs.length === pageSize,
          cursor: last,
        };
      })
    );
  }

  /** 🔹 Used by detail page: ALL items for that key context (no pagination) */
  getAllForKey(key: string | null): Observable<CollectionItem[]> {
    const colRef = collection(db, this.collectionName);
    const constraints: QueryConstraint[] = [];

    const normalizedKey = (key || '').trim().toLowerCase();
    if (normalizedKey && normalizedKey !== 'all') {
      constraints.push(where('key', '==', normalizedKey));
    }

    constraints.push(orderBy('createdAt', 'desc'));

    const q = query(colRef, ...constraints);

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