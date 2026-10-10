import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Auth-gated/auth-only routes: the guard reads localStorage, which doesn't exist during
  // SSR/prerendering, so these render client-side only rather than risk the guard redirecting
  // at build time.
  { path: 'dashboard/**', renderMode: RenderMode.Client },
  { path: 'login', renderMode: RenderMode.Client },
  // Public pages fetch their content from the CMS over HTTP, so they can't be Prerender — that
  // would bake in whatever the content was at Docker BUILD time (when the api container isn't
  // even running) and never update without a rebuild. Server renders them fresh per request,
  // once api-url.interceptor.ts can reach the api service over the Docker network.
  { path: '', renderMode: RenderMode.Server },
  { path: 'services/:slug', renderMode: RenderMode.Server },
  { path: 'projects/:slug', renderMode: RenderMode.Server },
  { path: 'en', renderMode: RenderMode.Server },
  { path: 'en/services/:slug', renderMode: RenderMode.Server },
  { path: 'en/projects/:slug', renderMode: RenderMode.Server },
  { path: '**', renderMode: RenderMode.Server },
];
