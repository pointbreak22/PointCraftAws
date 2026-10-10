import { Injectable, effect, inject, signal } from '@angular/core';
import { ContentService } from '../services/content.service';
import {
  CaseStudy,
  CaseStudyDetail,
  ProcessStep,
  ServiceCategory,
  ServiceDetail,
  TechStackArea,
  TrustPoint,
} from '../interfaces/content';
import { LocaleStore } from './locale.store';

/** undefined = still loading, null = no such slug (the page renders a 404). */
export type DetailState<T> = T | null | undefined;

@Injectable({ providedIn: 'root' })
export class ContentStore {
  private readonly contentService = inject(ContentService);
  private readonly localeStore = inject(LocaleStore);

  private readonly _trustPoints = signal<TrustPoint[]>([]);
  private readonly _services = signal<ServiceCategory[]>([]);
  private readonly _techStack = signal<TechStackArea[]>([]);
  private readonly _processSteps = signal<ProcessStep[]>([]);
  private readonly _caseStudies = signal<CaseStudy[]>([]);
  private readonly _serviceDetail = signal<DetailState<ServiceDetail>>(undefined);
  private readonly _caseStudyDetail = signal<DetailState<CaseStudyDetail>>(undefined);

  readonly trustPoints = this._trustPoints.asReadonly();
  readonly services = this._services.asReadonly();
  readonly techStack = this._techStack.asReadonly();
  readonly processSteps = this._processSteps.asReadonly();
  readonly caseStudies = this._caseStudies.asReadonly();
  readonly serviceDetail = this._serviceDetail.asReadonly();
  readonly caseStudyDetail = this._caseStudyDetail.asReadonly();

  constructor() {
    // Re-fetches whenever the locale signal changes, including the first run.
    effect(() => {
      const locale = this.localeStore.locale();
      this.contentService.getTrustPoints(locale).subscribe((value) => this._trustPoints.set(value));
      this.contentService.getServiceCategories(locale).subscribe((value) => this._services.set(value));
      this.contentService.getTechStack(locale).subscribe((value) => this._techStack.set(value));
      this.contentService.getProcessSteps(locale).subscribe((value) => this._processSteps.set(value));
      this.contentService.getCaseStudies(locale).subscribe((value) => this._caseStudies.set(value));
    });
  }

  loadServiceDetail(slug: string): void {
    this._serviceDetail.set(undefined);
    this.contentService.getServiceDetail(slug, this.localeStore.locale()).subscribe({
      next: (value) => this._serviceDetail.set(value),
      error: () => this._serviceDetail.set(null),
    });
  }

  loadCaseStudyDetail(slug: string): void {
    this._caseStudyDetail.set(undefined);
    this.contentService.getCaseStudyDetail(slug, this.localeStore.locale()).subscribe({
      next: (value) => this._caseStudyDetail.set(value),
      error: () => this._caseStudyDetail.set(null),
    });
  }
}
