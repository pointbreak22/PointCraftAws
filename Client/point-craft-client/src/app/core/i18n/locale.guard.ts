import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Locale } from '../../interfaces/locale';
import { LocaleStore } from '../../stores/locale.store';

// Sits on the two locale parent routes ('en' and '') in app.routes.ts. Runs on the server as
// well as in the browser, which is what makes the SSR output match the URL's language.
export function localeGuard(locale: Locale): CanActivateFn {
  return () => {
    inject(LocaleStore).setLocale(locale);
    return true;
  };
}
