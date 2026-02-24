export type CollectionKey = 'all' | 'digital' | 'photography' | 'sketchbook' | string;

export interface CollectionItem {
  id: string;
  key: string;
  date: string; // ISO format
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