import { Injectable, afterNextRender, computed, signal } from '@angular/core';
import { TRANSLATIONS } from '../i18n/translations';
import { Locale } from '../interfaces/locale';

const STORAGE_KEY = 'pointcraft:locale';
const DEFAULT_LOCALE: Locale = 'en';

@Injectable({ providedIn: 'root' })
export class LocaleStore {
  private readonly _locale = signal<Locale>(DEFAULT_LOCALE);
  readonly locale = this._locale.asReadonly();
  readonly t = computed(() => TRANSLATIONS[this._locale()]);

  constructor() {
    // afterNextRender never runs during SSR, so this is the only place that touches
    // localStorage/document — the server-rendered markup already matches DEFAULT_LOCALE.
    afterNextRender(() => {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
      this.setLocale(stored === 'en' || stored === 'ru' ? stored : DEFAULT_LOCALE);
    });
  }

  setLocale(locale: Locale): void {
    this._locale.set(locale);
    document.documentElement.lang = locale;
    localStorage.setItem(STORAGE_KEY, locale);
  }
}
