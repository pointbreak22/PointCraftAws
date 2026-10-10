import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Locale } from '../../interfaces/locale';
import { localizePath } from '../../shared/locale-path';
import { LocaleStore } from '../../stores/locale.store';
import { GITHUB_URL, ORGANIZATION_ID, SITE_LOGO, SITE_NAME, SITE_URL } from './site';

export interface SeoData {
  title: string;
  description: string;
  /** Locale-independent path of the page, e.g. '/' or '/services/web-services'. */
  path: string;
  type?: 'website' | 'article';
  /** Page-specific schema.org nodes, merged into one @graph with the organization node. */
  jsonLd?: object[];
  noindex?: boolean;
}

const OG_LOCALE: Record<Locale, string> = { ru: 'ru_RU', en: 'en_US' };
const LOCALES: Locale[] = ['ru', 'en'];

// Per-page <head>: title, description, canonical, hreflang alternates, Open Graph/Twitter and a
// single JSON-LD @graph. Works the same under SSR and in the browser — it only touches the
// document through DOCUMENT/Meta/Title, and replaces its own elements instead of appending.
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly localeStore = inject(LocaleStore);

  update(data: SeoData): void {
    const locale = this.localeStore.locale();
    const url = SITE_URL + localizePath(data.path, locale);

    this.title.setTitle(data.title);
    this.meta.updateTag({ name: 'description', content: data.description });
    this.meta.updateTag({ name: 'robots', content: data.noindex ? 'noindex, follow' : 'index, follow' });

    this.meta.updateTag({ property: 'og:type', content: data.type ?? 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:image', content: SITE_LOGO });
    this.meta.updateTag({ property: 'og:locale', content: OG_LOCALE[locale] });
    this.meta.updateTag({ property: 'og:locale:alternate', content: OG_LOCALE[locale === 'ru' ? 'en' : 'ru'] });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: data.title });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });
    this.meta.updateTag({ name: 'twitter:image', content: SITE_LOGO });

    this.setLink('canonical', null, data.noindex ? null : url);
    for (const alternate of LOCALES) {
      this.setLink('alternate', alternate, data.noindex ? null : SITE_URL + localizePath(data.path, alternate));
    }
    this.setLink('alternate', 'x-default', data.noindex ? null : SITE_URL + localizePath(data.path, 'ru'));

    this.setJsonLd({
      '@context': 'https://schema.org',
      '@graph': [this.organization(locale), ...(data.jsonLd ?? [])],
    });
  }

  private organization(locale: Locale): object {
    return {
      '@type': 'ProfessionalService',
      '@id': ORGANIZATION_ID,
      name: SITE_NAME,
      url: SITE_URL + localizePath('/', locale),
      logo: SITE_LOGO,
      image: SITE_LOGO,
      description: this.localeStore.t().seo.organizationDescription,
      sameAs: [GITHUB_URL],
      areaServed: 'Worldwide',
      availableLanguage: ['ru', 'en'],
      knowsAbout: [
        'Web development', 'SaaS', 'Marketplaces', 'E-commerce', 'Real-time applications', 'SignalR', 'WebRTC',
        'Desktop applications', 'Avalonia', '.NET', 'Angular', 'SSR', 'SEO', 'Web scraping', 'DevOps', 'Docker',
      ],
    };
  }

  /** Adds, updates or (with href null) removes one <link> owned by this service. */
  private setLink(rel: string, hreflang: string | null, href: string | null): void {
    const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
    let link = this.document.head.querySelector<HTMLLinkElement>(selector);
    if (!href) {
      link?.remove();
      return;
    }
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', rel);
      if (hreflang) link.setAttribute('hreflang', hreflang);
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }

  private setJsonLd(graph: object): void {
    let script = this.document.head.querySelector<HTMLScriptElement>('script#seo-jsonld');
    if (!script) {
      script = this.document.createElement('script');
      script.id = 'seo-jsonld';
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }
    // '<' escaped so no string in the content can close the <script> element early.
    script.textContent = JSON.stringify(graph).replace(/</g, '\\u003c');
  }
}
