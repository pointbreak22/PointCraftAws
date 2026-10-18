import { ChangeDetectionStrategy, Component, RESPONSE_INIT, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteFooter } from '../../components/site-footer/site-footer';
import { SiteHeader } from '../../components/site-header/site-header';
import { SeoService } from '../../core/seo/seo.service';
import { LocaleStore } from '../../stores/locale.store';

// Catch-all for unknown public URLs. Answers with a real 404 under SSR instead of redirecting to
// the landing page, which search engines treat as a soft 404.
@Component({
  selector: 'app-not-found',
  imports: [SiteHeader, SiteFooter, RouterLink],
  templateUrl: './not-found.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {
  private readonly localeStore = inject(LocaleStore);
  private readonly seo = inject(SeoService);
  private readonly responseInit = inject(RESPONSE_INIT, { optional: true });

  protected readonly t = this.localeStore.t;
  protected readonly home = this.localeStore.home;

  constructor() {
    if (this.responseInit) this.responseInit.status = 404;

    effect(() => {
      const t = this.t();
      this.seo.update({ title: t.detail.notFoundTitle, description: t.detail.notFoundText, path: '/', noindex: true });
    });
  }
}
