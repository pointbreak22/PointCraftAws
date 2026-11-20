import { ChangeDetectionStrategy, Component, RESPONSE_INIT, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../components/icon/icon';
import { IdeaMeter } from '../../components/idea-meter/idea-meter';
import { SiteFooter } from '../../components/site-footer/site-footer';
import { SiteHeader } from '../../components/site-header/site-header';
import { SeoService } from '../../core/seo/seo.service';
import { ORGANIZATION_ID, SITE_URL } from '../../core/seo/site';
import { breadcrumbJsonLd } from '../../core/seo/structured-data';
import { PROJECT_IDEA_DETAILS } from '../../i18n/project-idea-details';
import { RANKED_PROJECT_IDEAS, findProjectIdea } from '../../i18n/project-ideas';
import { localizePath } from '../../shared/locale-path';
import { ContentStore } from '../../stores/content.store';
import { LocaleStore } from '../../stores/locale.store';

// /ideas/:slug (and /en/ideas/:slug) — one of the "projects I can take on at any moment".
// Static content from i18n/project-ideas.ts, so the page needs no API call to render.
@Component({
  selector: 'app-idea-page',
  imports: [SiteHeader, SiteFooter, Icon, IdeaMeter, RouterLink],
  templateUrl: './idea-page.html',
  styleUrl: './idea-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdeaPage {
  private readonly contentStore = inject(ContentStore);
  private readonly localeStore = inject(LocaleStore);
  private readonly seo = inject(SeoService);
  private readonly responseInit = inject(RESPONSE_INIT, { optional: true });

  /** Bound from the :slug route param (withComponentInputBinding). */
  readonly slug = input.required<string>();

  protected readonly t = this.localeStore.t;
  protected readonly home = this.localeStore.home;
  protected readonly prefix = this.localeStore.prefix;

  protected readonly idea = computed(() => {
    const idea = findProjectIdea(this.slug());
    const details = PROJECT_IDEA_DETAILS[this.slug()];
    if (!idea || !details) return null;
    const locale = this.localeStore.locale();
    const rank = RANKED_PROJECT_IDEAS.indexOf(idea) + 1;
    return { ...idea, rank, ...idea.text[locale], ...details[locale] };
  });

  /** CMS services this idea belongs to, once the service list has loaded. */
  protected readonly relatedServices = computed(() => {
    const slugs = findProjectIdea(this.slug())?.services ?? [];
    return this.contentStore.services().filter((service) => slugs.includes(service.slug));
  });

  protected readonly otherIdeas = computed(() => {
    const locale = this.localeStore.locale();
    return RANKED_PROJECT_IDEAS.filter((idea) => idea.slug !== this.slug()).map((idea) => ({ slug: idea.slug, title: idea.text[locale].title }));
  });

  constructor() {
    effect(() => {
      const idea = this.idea();
      const t = this.t();
      const path = `/ideas/${this.slug()}`;

      if (!idea) {
        if (this.responseInit) this.responseInit.status = 404;
        this.seo.update({ title: t.detail.notFoundTitle, description: t.detail.notFoundText, path, noindex: true });
        return;
      }

      const locale = this.localeStore.locale();
      const url = SITE_URL + localizePath(path, locale);
      this.seo.update({
        title: `${idea.seoTitle} | ${t.ideas.titleSuffix}`,
        description: idea.seoDescription,
        keywords: [...idea.keywords, ...idea.stack],
        path,
        jsonLd: [
          {
            '@type': 'Service',
            '@id': `${url}#service`,
            name: idea.title,
            serviceType: idea.title,
            description: idea.seoDescription,
            url,
            inLanguage: locale,
            areaServed: 'Worldwide',
            audience: idea.audience.map((name) => ({ '@type': 'Audience', audienceType: name })),
            keywords: idea.keywords.join(', '),
            provider: { '@id': ORGANIZATION_ID },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: t.ideas.features,
              itemListElement: idea.features.map((feature) => ({
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: feature },
              })),
            },
          },
          breadcrumbJsonLd(
            [
              { name: t.nav.home, path: '/' },
              { name: t.ideas.crumb, path: '/#ideas' },
              { name: idea.title },
            ],
            locale,
          ),
        ],
      });
    });
  }
}
