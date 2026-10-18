import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { environment } from '../../../environments/environment';

type Ym = (id: number, method: string, ...args: unknown[]) => void;

// Yandex Metrika, loaded in the browser only and only when environment.yandexMetrikaId is set,
// so local builds and SSR never send hits. The router is single-page, so every navigation after
// the first is reported as its own hit.
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly counterId = environment.yandexMetrikaId;

  init(): void {
    if (!this.isBrowser || !this.counterId) return;

    const w = this.document.defaultView as Window & { ym?: Ym & { a?: unknown[]; l?: number } };
    w.ym ??= Object.assign((...args: unknown[]) => (w.ym!.a ??= []).push(args), { l: Date.now() }) as Ym;

    const script = this.document.createElement('script');
    script.async = true;
    script.src = 'https://mc.yandex.ru/metrika/tag.js';
    this.document.head.appendChild(script);

    w.ym(this.counterId, 'init', { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true, defer: true });

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      w.ym?.(this.counterId, 'hit', w.location.origin + event.urlAfterRedirects, { referer: this.document.referrer, title: this.document.title });
    });
  }

  /** Reports a conversion; the goal must exist in the Metrika counter settings with the same identifier. */
  reachGoal(goal: string): void {
    if (!this.isBrowser || !this.counterId) return;
    (this.document.defaultView as Window & { ym?: Ym }).ym?.(this.counterId, 'reachGoal', goal);
  }
}
