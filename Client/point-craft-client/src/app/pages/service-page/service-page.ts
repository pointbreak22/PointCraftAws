import { ChangeDetectionStrategy, Component, RESPONSE_INIT, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../components/icon/icon';
import { SiteFooter } from '../../components/site-footer/site-footer';
import { SiteHeader } from '../../components/site-header/site-header';
import { SeoService } from '../../core/seo/seo.service';
import { ORGANIZATION_ID } from '../../core/seo/site';
import { breadcrumbJsonLd } from '../../core/seo/structured-data';
import { splitParagraphs } from '../../shared/paragraphs';
import { ContentStore } from '../../stores/content.store';
import { LocaleStore } from '../../stores/locale.store';

// /services/:slug (and /en/services/:slug) — one SSR page per service, so each service can rank
// for its own queries instead of all of them competing as one section of the landing page.
@Component({
  selector: 'app-service-page',
  imports: [SiteHeader, SiteFooter, Icon, RouterLink],
  templateUrl: './service-page.html',
  styleUrl: './service-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicePage {
  private readonly contentStore = inject(ContentStore);
  private readonly localeStore = inject(LocaleStore);
  private readonly seo = inject(SeoService);
  private readonly responseInit = inject(RESPONSE_INIT, { optional: true });

  /** Bound from the :slug route param (withComponentInputBinding). */
  readonly slug = input.required<string>();

  protected readonly t = this.localeStore.t;
  protected readonly home = this.localeStore.home;
  protected readonly prefix = this.localeStore.prefix;
  protected readonly detail = this.contentStore.serviceDetail;
  protected readonly paragraphs = computed(() => splitParagraphs(this.detail()?.body ?? ''));
  protected readonly otherServices = computed(() =>
    this.contentStore.services().filter((service) => service.slug !== this.slug()),
  );

  constructor() {
    effect(() => this.contentStore.loadServiceDetail(this.slug()));

    effect(() => {
      const detail = this.detail();
      const t = this.t();
      if (detail === undefined) return;

      if (detail === null) {
        if (this.responseInit) this.responseInit.status = 404;
        this.seo.update({ title: t.detail.notFoundTitle, description: t.detail.notFoundText, path: `/services/${this.slug()}`, noindex: true });
        return;
      }

      const { service } = detail;
      const path = `/services/${service.slug}`;
      this.seo.update({
        title: `${service.title} — ${t.seo.serviceTitleSuffix}`,
        description: service.description,
        path,
        jsonLd: [
          {
            '@type': 'Service',
            name: service.title,
            description: service.description,
            serviceType: service.title,
            audience: { '@type': 'Audience', audienceType: service.audience },
            provider: { '@id': ORGANIZATION_ID },
            areaServed: 'Worldwide',
          },
          breadcrumbJsonLd(
            [
              { name: t.nav.home, path: '/' },
              { name: t.detail.servicesCrumb, path: '/#services' },
              { name: service.title },
            ],
            this.localeStore.locale(),
          ),
        ],
      });
    });
  }
}
