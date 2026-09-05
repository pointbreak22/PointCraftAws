import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStore } from './auth.store';

export const authGuard: CanActivateFn = () => {
  if (inject(AuthStore).isAuthenticated()) return true;
  return inject(Router).createUrlTree(['/login']);
};
