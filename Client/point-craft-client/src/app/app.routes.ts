import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { authGuard } from './core/auth/auth.guard';
import { localeGuard } from './core/i18n/locale.guard';

// Public pages, mounted twice below: Russian at the root, English under /en. Landing is eager
// (it's the entry point every visitor hits first); everything else loads on demand.
const publicPages: Routes = [
  { path: '', component: Landing },
  { path: 'services/:slug', loadComponent: () => import('./pages/service-page/service-page').then((m) => m.ServicePage) },
  { path: 'projects/:slug', loadComponent: () => import('./pages/project-page/project-page').then((m) => m.ProjectPage) },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound) },
];

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./pages/login/login').then((m) => m.Login) },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
    children: [
      { path: '', redirectTo: 'requests', pathMatch: 'full' },
      { path: 'requests', loadComponent: () => import('./pages/dashboard-requests/dashboard-requests').then((m) => m.DashboardRequests) },
      { path: 'services', loadComponent: () => import('./pages/dashboard-services/dashboard-services').then((m) => m.DashboardServices) },
      { path: 'tech-stack', loadComponent: () => import('./pages/dashboard-tech-stack/dashboard-tech-stack').then((m) => m.DashboardTechStack) },
      { path: 'process', loadComponent: () => import('./pages/dashboard-process/dashboard-process').then((m) => m.DashboardProcess) },
      { path: 'cases', loadComponent: () => import('./pages/dashboard-cases/dashboard-cases').then((m) => m.DashboardCases) },
      { path: 'trust-points', loadComponent: () => import('./pages/dashboard-trust-points/dashboard-trust-points').then((m) => m.DashboardTrustPoints) },
    ],
  },
  { path: 'en', canActivate: [localeGuard('en')], children: publicPages },
  // Unknown URLs fall through to publicPages' '**' (NotFound, HTTP 404) in the matching locale.
  { path: '', canActivate: [localeGuard('ru')], children: publicPages },
];
