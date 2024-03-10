import { CanActivateFn, Router } from '@angular/router';
import { SupplyingService } from './supplying.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService=inject(SupplyingService);
  const router=inject(Router);
  authService.redirectUrl = state.url;
  return authService.isLoggedIn ? true:router.parseUrl('/login');
};
