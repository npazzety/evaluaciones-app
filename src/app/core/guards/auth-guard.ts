import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userEmail = localStorage.getItem('userEmail');

  // 1. SI NO HAY SESIÓN: Bloqueo total y al Login
  if (!isLoggedIn || !userEmail) {
    return router.parseUrl('/login');
  }

  // 2. SEGURIDAD DE ROL: Si un empleado intenta entrar a gestión por URL
  if (state.url.includes('gestion') && userEmail !== 'jefe@test.com') {
    return router.parseUrl('/dashboard/prohibido');
  }

  return true; // Acceso permitido
};
