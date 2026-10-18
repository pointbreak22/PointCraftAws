import { ChangeDetectionStrategy, Component, RESPONSE_INIT, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../components/icon/icon';
import { SiteFooter } from '../../components/site-footer/site-footer';
import { SiteHeader } from '../../components/site-header/site-header';
import { SeoService } from '../../core/seo/seo.service';
import { projectPageSeo, snippet } from '../../core/seo/page-seo';
import { ORGANIZATION_ID, SITE_URL } from '../../core/seo/site';
import { breadcrumbJsonLd } from '../../core/seo/structured-data';
import { localizePath } from '../../shared/locale-path';
import { splitParagraphs } from '../../shared/paragraphs';
import { ContentStore } from '../../stores/content.store';
import { LocaleStore } from '../../stores/locale.store';

// /projects/:slug (and /en/projects/:slug) — the full architecture write-up of one case study.
@Component({
  selector: 'app-project-page',
  imports: [SiteHeader, SiteFooter, Icon, RouterLink],
  templateUrl: './project-page.html',
  styleUrl: './project-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectPage {
  private readonly contentStore = inject(ContentStore);
  private readonly localeStore = inject(LocaleStore);
  private readonly seo = inject(SeoService);
  private readonly responseInit = inject(RESPONSE_INIT, { optional: true });

  /** Bound from the :slug route param (withComponentInputBinding). */
  readonly slug = input.required<string>();

  protected readonly t = this.localeStore.t;
  protected readonly home = this.localeStore.home;
  protected readonly prefix = this.localeStore.prefix;
  protected readonly detail = this.contentStore.caseStudyDetail;
  protected readonly paragraphs = computed(() => splitParagraphs(this.detail()?.body ?? ''));
  protected readonly otherProjects = computed(() =>
    this.contentStore.caseStudies().filter((item) => item.slug !== this.slug()),
  );

  constructor() {
    effect(() => this.contentStore.loadCaseStudyDetail(this.slug()));

    effect(() => {
      const detail = this.detail();
      const t = this.t();
      if (detail === undefined) return;

      if (detail === null) {
        if (this.responseInit) this.responseInit.status = 404;
        this.seo.update({ title: t.detail.notFoundTitle, description: t.detail.notFoundText, path: `/projects/${this.slug()}`, noindex: true });
        return;
      }

      const { caseStudy } = detail;
      const locale = this.localeStore.locale();
      const path = `/projects/${caseStudy.slug}`;
      const pageSeo = projectPageSeo(caseStudy.slug, locale);
      this.seo.update({
        title: pageSeo ? `${pageSeo.title} | ${t.seo.serviceTitleSuffix}` : `${caseStudy.title} — ${t.seo.projectTitleSuffix}`,
        description: pageSeo?.description ?? snippet(caseStudy.task),
        keywords: [...(pageSeo?.keywords ?? []), ...caseStudy.stack],
        path,
        type: 'article',
        jsonLd: [
          {
            '@type': 'CreativeWork',
            name: caseStudy.title,
            headline: caseStudy.title,
            abstract: caseStudy.task,
            description: caseStudy.solution,
            url: SITE_URL + localizePath(path, locale),
            inLanguage: locale,
            keywords: [...(pageSeo?.keywords ?? []), ...caseStudy.stack].join(', '),
            creator: { '@id': ORGANIZATION_ID },
            ...(caseStudy.url ? { sameAs: caseStudy.url } : {}),
            about: detail.services.map((service) => ({
              '@type': 'Service',
              name: service.title,
              url: SITE_URL + localizePath(`/services/${service.slug}`, locale),
            })),
          },
          breadcrumbJsonLd(
            [
              { name: t.nav.home, path: '/' },
              { name: t.detail.projectsCrumb, path: '/#cases' },
              { name: caseStudy.title },
            ],
            locale,
          ),
        ],
      });
    });
  }
}
