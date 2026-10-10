import { Locale } from '../../interfaces/locale';
import { localizePath } from '../../shared/locale-path';
import { SITE_URL } from './site';

export interface Crumb {
  name: string;
  /** Locale-independent path; omitted for the current page. */
  path?: string;
}

export function breadcrumbJsonLd(crumbs: Crumb[], locale: Locale): object {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      ...(crumb.path ? { item: SITE_URL + localizePath(crumb.path, locale) } : {}),
    })),
  };
}
