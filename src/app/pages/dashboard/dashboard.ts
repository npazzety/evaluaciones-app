import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html'
})

export class Dashboard {
  private router = inject(Router);

  // Obtenemos el rol del localStorage
  userRole: string | null = localStorage.getItem('userRole');
  emailUsuario: string | null = localStorage.getItem('userEmail');

  logout() {
    localStorage.clear(); // Limpia todo (auth y rol)
    this.router.navigate(['/login']);
  }
}
