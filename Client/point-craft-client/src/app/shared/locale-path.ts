import { Locale } from '../interfaces/locale';

// Russian lives at the site root, English under /en — every public page exists at both
// addresses (see app.routes.ts), so search engines index each language separately.
export const DEFAULT_LOCALE: Locale = 'ru';

/** URL prefix for a locale: '' for Russian, '/en' for English. */
export function localePrefix(locale: Locale): string {
  return locale === 'en' ? '/en' : '';
}

/** Locale-independent path ('/services/x') → that page's address in `locale` ('/en/services/x'). */
export function localizePath(path: string, locale: Locale): string {
  const prefix = localePrefix(locale);
  if (!prefix) return path || '/';
  return path === '/' || path === '' ? prefix : prefix + path;
}

/** A router URL in either locale → its locale-independent path, without query or fragment. */
export function stripLocale(url: string): string {
  const path = url.split(/[?#]/)[0] || '/';
  if (path === '/en' || path === '/en/') return '/';
  return path.startsWith('/en/') ? path.slice(3) : path;
}
