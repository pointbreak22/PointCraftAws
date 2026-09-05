import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ContactRequest, ContactRequestListItem } from '../interfaces/content';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  send(request: ContactRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/ContactRequests`, request);
  }

  // Admin-only — requires the Authorization header the auth interceptor attaches.
  list(): Observable<ContactRequestListItem[]> {
    return this.http.get<ContactRequestListItem[]>(`${environment.apiBaseUrl}/api/ContactRequests`);
  }
}
