import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { authGuard } from './core/auth/auth.guard';

// Landing is eager (it's the entry point every visitor hits first); everything
// behind it loads on demand so a landing-only visit doesn't download the rest
// of the app.
export const routes: Routes = [
  { path: '', component: Landing },
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
  { path: '**', redirectTo: '' },
];
