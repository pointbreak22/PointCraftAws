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
  },
  { path: '**', redirectTo: '' },
];
