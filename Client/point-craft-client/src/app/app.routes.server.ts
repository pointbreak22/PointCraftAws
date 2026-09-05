import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Auth-gated/auth-only routes: the guard reads localStorage, which doesn't exist during
  // SSR/prerendering, so these render client-side only rather than risk the guard redirecting
  // at build time.
  { path: 'dashboard/**', renderMode: RenderMode.Client },
  { path: 'login', renderMode: RenderMode.Client },
  // Landing now fetches its content over HTTP (Phase 2 CMS) instead of static data, so it can no
  // longer be Prerender — that would bake in whatever the content happened to be at Docker BUILD
  // time (when the api container isn't even running yet) and never update again without a
  // rebuild. Server renders it fresh on every request instead, once the container is actually up
  // and api-url.interceptor.ts can reach the api service over the Docker network.
  { path: '', renderMode: RenderMode.Server },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
