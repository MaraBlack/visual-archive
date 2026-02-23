import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export type CollectionKey = 'all' | 'digital' | 'photography' | 'sketchbook' | string;

export interface CollectionItem {
  id: string;
  key: string;
  year: number;
  title: string;
  img: string;
}

export interface PagedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

@Injectable({ providedIn: 'root' })
export class CollectionService {
  constructor(private readonly http: HttpClient) { }

  /**
   * Loads available collection keys (filters) from the backend.
   *
   * API contract (mocked in dev):
   * GET /api/keys
   */
  getKeys(): Observable<string[]> {
    return this.http.get<string[]>('/api/keys');
  }

  /**
   * Loads items from the backend.
   *
   * API contract (mocked in dev):
   * GET /api/items?key=digital&page=1&pageSize=12
   */
  getItems(args: {
    key?: string | null;
    page: number;
    pageSize: number;
  }): Observable<PagedResult<CollectionItem>> {
    let params = new HttpParams()
      .set('page', String(args.page))
      .set('pageSize', String(args.pageSize));

    if (args.key) {
      params = params.set('key', args.key);
    }

    return this.http.get<PagedResult<CollectionItem>>('/api/items', { params });
  }
}
