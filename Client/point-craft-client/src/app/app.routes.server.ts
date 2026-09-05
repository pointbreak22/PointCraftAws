import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Auth-gated/auth-only routes: the guard reads localStorage, which doesn't exist during
  // SSR/prerendering, so these render client-side only rather than risk the guard redirecting
  // at build time.
  { path: 'dashboard', renderMode: RenderMode.Client },
  { path: 'login', renderMode: RenderMode.Client },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
