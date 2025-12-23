import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  constructor() {}

  login() {
    this.loggedIn = true;
    localStorage.setItem('token', 'fake-jwt-token'); // Simulamos el token por ahora
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
