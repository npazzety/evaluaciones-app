import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Revisamos si existe la señal en el almacenamiento del navegador
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (isLoggedIn) {
    return true; // Deja pasar
  } else {
    // Si no está logueado, lo manda al login
    router.navigate(['/login']);
    return false;
  }
};
