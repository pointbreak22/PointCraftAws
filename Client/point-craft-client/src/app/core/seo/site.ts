// Public identity of the site — used for canonical URLs, Open Graph and JSON-LD. The domain is
// still the original one; change SITE_URL here (and Site:BaseUrl in the API for the sitemap)
// when the site moves to its own domain.
export const SITE_URL = 'https://pointcraft.duckdns.org';
export const SITE_NAME = 'PointBreak Lab';
export const SITE_LOGO = `${SITE_URL}/logo.png`;
/** 1200×630 link-preview images (public/og-ru.png, og-en.png), one per locale. */
export const OG_IMAGE = { ru: `${SITE_URL}/og-ru.png`, en: `${SITE_URL}/og-en.png` } as const;
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;
export const GITHUB_URL = 'https://github.com/pointbreak22';
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
