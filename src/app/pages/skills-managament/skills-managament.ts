import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PortalHeaderComponent } from '../../shared/arboles/portal-header/portal-header';

@Component({
  selector: 'app-skills-managament',
  standalone: true,
  imports: [CommonModule, RouterModule, PortalHeaderComponent],
  templateUrl: './skills-managament.html',
  styleUrls: ['./skills-managament.css']
})
export class GestionHabilidadesComponent {
  public router = inject(Router);

  /**
   * Verifica si estamos en la ruta principal de gestión.
   * Si es true, muestra el estado vacío.
   * Si es false (porque estamos en /nuevo), muestra el router-outlet.
   */
  isMainRoute(): boolean {
    return this.router.url === '/dashboard/gestion';
  }
}
