import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GITHUB_URL } from '../../core/seo/site';
import { ContentStore } from '../../stores/content.store';
import { LocaleStore } from '../../stores/locale.store';
import { Icon } from '../icon/icon';

// Lists every service and project page, so each one is linked from every page of the site —
// crawlers find them all even before the sitemap is read.
@Component({
  selector: 'app-site-footer',
  imports: [NgOptimizedImage, RouterLink, Icon],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooter {
  private readonly localeStore = inject(LocaleStore);
  protected readonly contentStore = inject(ContentStore);
  protected readonly year = new Date().getFullYear();
  protected readonly t = this.localeStore.t;
  protected readonly home = this.localeStore.home;
  protected readonly prefix = this.localeStore.prefix;
  protected readonly githubUrl = GITHUB_URL;
}
