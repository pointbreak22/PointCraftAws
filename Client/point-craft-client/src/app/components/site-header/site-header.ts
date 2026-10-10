import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { Icon } from '../icon/icon';
import { LOCALE_OPTIONS } from '../../shared/locale-options';
import { localizePath, stripLocale } from '../../shared/locale-path';
import { LocaleStore } from '../../stores/locale.store';
import { ThemeStore } from '../../stores/theme.store';

@Component({
  selector: 'app-site-header',
  imports: [Icon, NgOptimizedImage, RouterLink],
  templateUrl: './site-header.html',
  styleUrl: './site-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeader {
  private readonly themeStore = inject(ThemeStore);
  private readonly localeStore = inject(LocaleStore);
  private readonly router = inject(Router);

  protected readonly theme = this.themeStore.theme;
  protected readonly locale = this.localeStore.locale;
  protected readonly t = this.localeStore.t;
  protected readonly home = this.localeStore.home;
  protected readonly mobileMenuOpen = signal(false);

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  // Each language option links to the same page in the other locale.
  protected readonly localeLinks = computed(() => {
    const path = stripLocale(this.url());
    return LOCALE_OPTIONS.map((option) => ({ ...option, href: localizePath(path, option.id) }));
  });

  protected readonly navLinks = [
    { fragment: 'services', key: 'services' as const },
    { fragment: 'stack', key: 'stack' as const },
    { fragment: 'cases', key: 'cases' as const },
    { fragment: 'faq', key: 'faq' as const },
  ];

  toggleTheme(): void {
    this.themeStore.setTheme(this.theme() === 'dark' ? 'light' : 'dark');
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
