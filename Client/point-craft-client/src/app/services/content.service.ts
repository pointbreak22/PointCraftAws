import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  CaseStudy,
  ProcessStep,
  ServiceCategory,
  TechStackArea,
  TrustPoint,
} from '../interfaces/content';
import { Locale } from '../interfaces/locale';

// Was static bilingual data with a comment promising this exact swap once a backend existed —
// see Api/PointCraftApi/WebAPI/Controllers/ContentController.cs for the endpoints. ContentStore
// and every landing-page component needed zero changes for this.
@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly http = inject(HttpClient);

  getTrustPoints(locale: Locale): Observable<TrustPoint[]> {
    return this.http.get<TrustPoint[]>(`${environment.apiBaseUrl}/api/content/trust-points`, this.params(locale));
  }

  getServiceCategories(locale: Locale): Observable<ServiceCategory[]> {
    return this.http.get<ServiceCategory[]>(`${environment.apiBaseUrl}/api/content/services`, this.params(locale));
  }

  getTechStack(locale: Locale): Observable<TechStackArea[]> {
    return this.http.get<TechStackArea[]>(`${environment.apiBaseUrl}/api/content/tech-stack`, this.params(locale));
  }

  getProcessSteps(locale: Locale): Observable<ProcessStep[]> {
    return this.http.get<ProcessStep[]>(`${environment.apiBaseUrl}/api/content/process-steps`, this.params(locale));
  }

  getCaseStudies(locale: Locale): Observable<CaseStudy[]> {
    return this.http.get<CaseStudy[]>(`${environment.apiBaseUrl}/api/content/case-studies`, this.params(locale));
  }

  private params(locale: Locale) {
    return { params: new HttpParams().set('locale', locale) };
  }
}
