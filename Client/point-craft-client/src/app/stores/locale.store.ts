import { DOCUMENT } from '@angular/common';
import { Injectable, computed, inject, signal } from '@angular/core';
import { TRANSLATIONS } from '../i18n/translations';
import { Locale } from '../interfaces/locale';
import { DEFAULT_LOCALE, localePrefix } from '../shared/locale-path';

// The locale comes from the URL ('/' = ru, '/en' = en), set by localeGuard on route activation —
// so the server renders the right language too, instead of every crawler only ever seeing the
// default one. Switching language is a navigation to the other address, not a toggle.
@Injectable({ providedIn: 'root' })
export class LocaleStore {
  private readonly document = inject(DOCUMENT);

  private readonly _locale = signal<Locale>(DEFAULT_LOCALE);
  readonly locale = this._locale.asReadonly();
  readonly t = computed(() => TRANSLATIONS[this._locale()]);
  /** Prefix for internal links in the current locale: '' or '/en'. */
  readonly prefix = computed(() => localePrefix(this._locale()));
  /** routerLink target of the current locale's home page. */
  readonly home = computed(() => this.prefix() || '/');

  setLocale(locale: Locale): void {
    this._locale.set(locale);
    this.document.documentElement.lang = locale;
  }
}
