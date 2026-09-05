import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';

// Landing is eager (it's the entry point every visitor hits first); everything
// behind it loads on demand so a landing-only visit doesn't download the rest
// of the app.
export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard) },
  { path: '**', redirectTo: '' },
];
