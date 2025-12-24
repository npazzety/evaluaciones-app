import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userEmail = localStorage.getItem('userEmail');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // 1. Si no hay sesión, al login
  if (!isLoggedIn) {
    return router.parseUrl('/login');
  }

  // 2. BLOQUEO ESTRICTO: Si la ruta es 'gestion' y no es el jefe
  if (state.url.includes('gestion') && userEmail !== 'jefe@test.com') {
    console.error('Acceso denegado: No tienes permisos de Jefe');
    return router.parseUrl('/dashboard/evaluacion'); // Lo redirige a su área permitida
  }

  return true;
};
