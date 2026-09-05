import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

// Not @Injectable — instantiated directly per admin page (`new AdminContentService(http, 'services')`)
// since the 5 content types need the exact same List/Create/Update/Delete calls, just against a
// different resource path. Avoids 5 near-duplicate injectable services for no behavioral difference.
export class AdminContentService<T extends { id: string }> {
  constructor(
    private readonly http: HttpClient,
    private readonly resource: string,
  ) {}

  private get baseUrl(): string {
    return `${environment.apiBaseUrl}/api/admin/${this.resource}`;
  }

  list(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl);
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, item);
  }

  update(item: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${item.id}`, item);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

export const EMPTY_ADMIN_ID = '00000000-0000-0000-0000-000000000000';
