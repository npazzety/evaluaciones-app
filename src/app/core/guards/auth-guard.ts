import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';

export const authGuard = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const isAuth = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole');

  if (!isAuth) {
    router.navigate(['/login']);
    return false;
  }

  // Lógica de protección por Rol
  // Si la ruta que intenta acceder es 'gestion' y no es ADMIN, lo bloqueamos
  if (route.routeConfig?.path === 'gestion' && userRole !== 'ADMIN') {
    router.navigate(['/dashboard/evaluacion']); // Lo mandamos a su área permitida
    return false;
  }

  return true;
};
