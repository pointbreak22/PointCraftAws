import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Icon } from '../icon/icon';
import { LOCALE_OPTIONS } from '../../shared/locale-options';
import { Locale } from '../../interfaces/locale';
import { LocaleStore } from '../../stores/locale.store';
import { ThemeStore } from '../../stores/theme.store';

@Component({
  selector: 'app-site-header',
  imports: [Icon, NgOptimizedImage],
  templateUrl: './site-header.html',
  styleUrl: './site-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeader {
  private readonly themeStore = inject(ThemeStore);
  private readonly localeStore = inject(LocaleStore);

  protected readonly theme = this.themeStore.theme;
  protected readonly locale = this.localeStore.locale;
  protected readonly t = this.localeStore.t;
  protected readonly localeOptions = LOCALE_OPTIONS;
  protected readonly mobileMenuOpen = signal(false);

  protected readonly navLinks = [
    { href: '#services', key: 'services' as const },
    { href: '#stack', key: 'stack' as const },
    { href: '#process', key: 'process' as const },
    { href: '#cases', key: 'cases' as const },
  ];

  toggleTheme(): void {
    this.themeStore.setTheme(this.theme() === 'dark' ? 'light' : 'dark');
  }

  setLocale(locale: Locale): void {
    this.localeStore.setLocale(locale);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
