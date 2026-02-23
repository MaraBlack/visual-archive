import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';
import { ITEMS } from '../../features/collection/mock/collection-data';

function toInt(value: string | null, fallback: number): number {
  const n = Number.parseInt(value ?? '', 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  // Only mock our API routes; let assets/unsplash images pass through untouched.
  if (!req.url.includes('/api/')) {
    return next(req);
  }

  // GET /api/keys
  if (req.method === 'GET' && req.url.includes('/api/keys')) {
    const keys = Array.from(new Set(ITEMS.map(i => i.key))).sort();
    return of(new HttpResponse({ status: 200, body: keys })).pipe(delay(150));
  }

  // GET /api/items?key=digital&page=1&pageSize=12
  if (req.method === 'GET' && req.url.includes('/api/items')) {
    const key = (req.params.get('key') || '').trim().toLowerCase();
    const page = toInt(req.params.get('page'), 1);
    const pageSize = toInt(req.params.get('pageSize'), 9);

    const filtered = !key || key === 'all' ? ITEMS : ITEMS.filter(i => i.key === key);
    const total = filtered.length;

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const items = filtered.slice(start, end);
    const hasMore = end < total;

    return of(
      new HttpResponse({
        status: 200,
        body: {
          items,
          page,
          pageSize,
          total,
          hasMore
        }
      })
    ).pipe(delay(450));
  }

  return next(req);
};
