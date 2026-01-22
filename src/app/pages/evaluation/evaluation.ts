import { Component, signal, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from "@angular/router";
import { filter } from 'rxjs/operators';
import { HabilidadesService } from '../../core/services/habilidades';
import { PortalHeaderComponent } from '../../shared/arboles/portal-header/portal-header';
import { SkillRatingCardComponent } from '../../shared/hojas/skill-rating-card/skill-rating-card';
import { AccessDeniedComponent } from '../../shared/ramas/access-denied/access-denied';

@Component({
  selector: 'app-evaluacion',
  standalone: true,
  imports: [
    CommonModule, FormsModule, PortalHeaderComponent, SkillRatingCardComponent,
    AccessDeniedComponent, RouterOutlet, RouterLink, RouterLinkActive
  ],
  templateUrl: './evaluation.html',
  styleUrls: ['./evaluation.css']
})
export class Evaluacion implements OnInit {
  private router = inject(Router);

  habilidadesActivas = signal<any[]>([]);
  accesoPermitido = signal<boolean>(true);

  // Usamos un signal para que Angular detecte el cambio de ruta al instante
  esFormulario = signal<boolean>(false);

  ngOnInit() {
    this.cargarDatosPrueba();

    // Verificamos la ruta al cargar
    this.actualizarEstadoRuta(this.router.url);

    // Escuchamos cambios de navegación para actualizar sin recargar
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.actualizarEstadoRuta(event.urlAfterRedirects);
    });
  }

  private actualizarEstadoRuta(url: string) {
    this.esFormulario.set(url.includes('/form/'));
  }

  cargarDatosPrueba() {
    this.habilidadesActivas.set([
      { id: 1, nombre: 'Comunicación Asertiva', ponderacion: 30, nota: 0 },
      { id: 2, nombre: 'Trabajo en Equipo', ponderacion: 40, nota: 0 },
      { id: 3, nombre: 'Resolución de Problemas', ponderacion: 30, nota: 0 }
    ]);
  }
}
