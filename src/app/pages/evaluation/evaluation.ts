import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HabilidadesService } from '../../core/services/habilidades';
import { PortalHeaderComponent } from '../../shared/arboles/portal-header/portal-header';
import { SkillRatingCardComponent } from '../../shared/hojas/skill-rating-card/skill-rating-card';
import { AccessDeniedComponent } from '../../shared/ramas/access-denied/access-denied';
import { EvaluationHistoryComponent } from './evaluation-history/evaluation-history';
import { PendingEvaluationsComponent } from './pending-evaluations/pending-evaluations';
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-evaluacion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PortalHeaderComponent,
    SkillRatingCardComponent,
    AccessDeniedComponent,
    EvaluationHistoryComponent,
    PendingEvaluationsComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './evaluation.html'
})
export class Evaluacion implements OnInit {
  private habilidadesService = inject(HabilidadesService);

  habilidadesActivas = signal<any[]>([]);
  evaluacionSeleccionada = signal<boolean>(false);
  accesoPermitido = signal<boolean>(true);

  ngOnInit() {
    this.cargarDatosPrueba();
  }

  cargarDatosPrueba() {
    this.habilidadesActivas.set([
      { id: 1, nombre: 'Comunicación Asertiva', ponderacion: 30, nota: 0 },
      { id: 2, nombre: 'Trabajo en Equipo', ponderacion: 40, nota: 0 },
      { id: 3, nombre: 'Resolución de Problemas', ponderacion: 30, nota: 0 }
    ]);
  }

  abrirEvaluacion() { this.evaluacionSeleccionada.set(true); }
  cancelar() { this.evaluacionSeleccionada.set(false); }
}
