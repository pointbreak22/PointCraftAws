import { HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';

// Server-side requests (SSR on '/', see app.routes.server.ts) can't use a relative URL the way
// the browser does — there's no page origin to resolve it against, and "localhost" from inside
// the client container wouldn't reach the api container anyway. INTERNAL_API_URL (set in
// docker-compose.yml, Docker-network-internal, never exposed) gives the server-rendering path
// an absolute address; the browser always keeps using the relative path proxied by Caddy.
export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
  if (isPlatformServer(inject(PLATFORM_ID)) && req.url.startsWith('/api')) {
    const internalApiUrl = typeof process !== 'undefined' ? process.env['INTERNAL_API_URL'] : undefined;
    if (internalApiUrl) {
      return next(req.clone({ url: internalApiUrl + req.url }));
    }
  }
  return next(req);
};
