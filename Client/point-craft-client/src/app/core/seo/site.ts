// Public identity of the site — used for canonical URLs, Open Graph and JSON-LD. The domain is
// still the original one; change SITE_URL here (and Site:BaseUrl in the API for the sitemap)
// when the site moves to its own domain.
export const SITE_URL = 'https://pointcraft.duckdns.org';
export const SITE_NAME = 'POINTBREAK VexForge Lab';
/**
 * Other spellings people type for the brand — fed to JSON-LD alternateName and the home page keywords so
 * search engines tie "pointbreak vexforge", "vex forge", the old name etc. to this site.
 */
export const SITE_ALTERNATE_NAMES = [
  'PointBreak VexForge',
  'PointBreak VexForge Lab',
  'VexForge Lab',
  'VexForge',
  'PointBreak Vex Forge',
  'POINTBREAK22 Lab',
] as const;
/** Lower-case search phrases for the brand itself, for <meta name="keywords"> on the home page. */
export const BRAND_KEYWORDS = [
  'pointbreak vexforge',
  'pointbreak vexforge lab',
  'vexforge',
  'vexforge lab',
  'vex forge',
  'pointbreak vex forge',
  'pointbreak lab',
];
export const SITE_LOGO = `${SITE_URL}/logo.png`;
/** 1200×630 link-preview images (public/og-ru.png, og-en.png), one per locale. */
export const OG_IMAGE = { ru: `${SITE_URL}/og-ru.png`, en: `${SITE_URL}/og-en.png` } as const;
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;
export const GITHUB_URL = 'https://github.com/pointbreak22';
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
