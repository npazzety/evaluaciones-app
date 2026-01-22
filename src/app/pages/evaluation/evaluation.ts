import { Component, signal, OnInit, inject } from '@angular/core';
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
  esFormulario = signal<boolean>(false);
  isPendientesActive = signal<boolean>(false);
  escalaPuntaje = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  ngOnInit() {
    this.cargarDatosPrueba();
    this.actualizarEstadosVisuales(this.router.url);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.actualizarEstadosVisuales(event.urlAfterRedirects || event.url);
    });
  }

  private actualizarEstadosVisuales(url: string) {
    this.esFormulario.set(url.includes('/form/'));
    this.isPendientesActive.set(url.includes('/nueva') || url.includes('/form/'));
  }

  // Genera el fondo de "carga" azul que sigue al thumb del slider
  getSliderBackground(value: number) {
    const percentage = (value / 10) * 100;
    return `linear-gradient(to right, #002855 ${percentage}%, #f1f5f9 ${percentage}%)`;
  }

  irAtras() {
    this.router.navigate(['/dashboard/evaluacion/nueva']);
  }

  enviarEvaluacion() {
    console.log("Datos para enviar:", this.habilidadesActivas());
    // Aquí iría tu servicio de guardado
  }

  cargarDatosPrueba() {
    this.habilidadesActivas.set([
      { id: 1, nombre: 'Comunicación Asertiva', descripcion: 'Expresión clara e ideas respetuosas.', nota: 5 },
      { id: 2, nombre: 'Trabajo en Equipo', descripcion: 'Colaboración activa en metas comunes.', nota: 0 },
      { id: 3, nombre: 'Resolución de Problemas', descripcion: 'Eficacia para proponer soluciones.', nota: 0 },
      { id: 4, nombre: 'Liderazgo', descripcion: 'Capacidad de guiar y motivar grupos.', nota: 0 },
      { id: 5, nombre: 'Liderazgo', descripcion: 'Capacidad de guiar y motivar grupos.', nota: 0 },
      { id: 6, nombre: 'Liderazgo', descripcion: 'Capacidad de guiar y motivar grupos.', nota: 0 },
      { id: 7, nombre: 'Liderazgo', descripcion: 'Capacidad de guiar y motivar grupos.', nota: 0 },
      { id: 8, nombre: 'Liderazgo', descripcion: 'Capacidad de guiar y motivar grupos.', nota: 0 },,
      { id: 9, nombre: 'Liderazgo', descripcion: 'Capacidad de guiar y motivar grupos.', nota: 0 },,
      { id: 10, nombre: 'Liderazgo', descripcion: 'Capacidad de guiar y motivar grupos.', nota: 0 }
    ]);
  }
}
