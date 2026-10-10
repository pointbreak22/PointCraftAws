import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { CaseStudiesSection } from '../../components/case-studies-section/case-studies-section';
import { ContactSection } from '../../components/contact-section/contact-section';
import { FaqSection } from '../../components/faq-section/faq-section';
import { HeroSection } from '../../components/hero-section/hero-section';
import { ProcessSection } from '../../components/process-section/process-section';
import { ServicesGrid } from '../../components/services-grid/services-grid';
import { SiteFooter } from '../../components/site-footer/site-footer';
import { SiteHeader } from '../../components/site-header/site-header';
import { TechStackSection } from '../../components/tech-stack-section/tech-stack-section';
import { SeoService } from '../../core/seo/seo.service';
import { ORGANIZATION_ID, SITE_NAME, SITE_URL } from '../../core/seo/site';
import { localizePath } from '../../shared/locale-path';
import { ContentStore } from '../../stores/content.store';
import { LocaleStore } from '../../stores/locale.store';

@Component({
  selector: 'app-landing',
  imports: [
    SiteHeader,
    HeroSection,
    ServicesGrid,
    TechStackSection,
    ProcessSection,
    CaseStudiesSection,
    FaqSection,
    ContactSection,
    SiteFooter,
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Landing {
  private readonly seo = inject(SeoService);
  private readonly localeStore = inject(LocaleStore);
  private readonly contentStore = inject(ContentStore);

  constructor() {
    // Re-runs when the services arrive, so the server-rendered JSON-LD already lists them.
    effect(() => {
      const t = this.localeStore.t();
      const locale = this.localeStore.locale();
      const services = this.contentStore.services();

      this.seo.update({
        title: t.seo.homeTitle,
        description: t.seo.homeDescription,
        path: '/',
        jsonLd: [
          {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: SITE_URL + localizePath('/', locale),
            name: SITE_NAME,
            inLanguage: locale,
            publisher: { '@id': ORGANIZATION_ID },
          },
          {
            '@type': 'OfferCatalog',
            name: t.services.heading,
            itemListElement: services.map((service, index) => ({
              '@type': 'Offer',
              position: index + 1,
              itemOffered: {
                '@type': 'Service',
                name: service.title,
                description: service.description,
                url: SITE_URL + localizePath(`/services/${service.slug}`, locale),
                provider: { '@id': ORGANIZATION_ID },
              },
            })),
          },
          {
            '@type': 'FAQPage',
            mainEntity: t.faq.items.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: { '@type': 'Answer', text: item.answer },
            })),
          },
        ],
      });
    });
  }
}
