import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html'
})
export class SidebarComponent {
  private router = inject(Router);

  // Extraemos la lógica de permisos aquí
  emailUsuario: string | null = localStorage.getItem('userEmail');

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
