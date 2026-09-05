import { Injectable, effect, inject, signal } from '@angular/core';
import { ContentService } from '../services/content.service';
import { CaseStudy, ProcessStep, ServiceCategory, TechStackArea, TrustPoint } from '../interfaces/content';
import { LocaleStore } from './locale.store';

@Injectable({ providedIn: 'root' })
export class ContentStore {
  private readonly contentService = inject(ContentService);
  private readonly localeStore = inject(LocaleStore);

  private readonly _trustPoints = signal<TrustPoint[]>([]);
  private readonly _services = signal<ServiceCategory[]>([]);
  private readonly _techStack = signal<TechStackArea[]>([]);
  private readonly _processSteps = signal<ProcessStep[]>([]);
  private readonly _caseStudies = signal<CaseStudy[]>([]);

  readonly trustPoints = this._trustPoints.asReadonly();
  readonly services = this._services.asReadonly();
  readonly techStack = this._techStack.asReadonly();
  readonly processSteps = this._processSteps.asReadonly();
  readonly caseStudies = this._caseStudies.asReadonly();

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
}
