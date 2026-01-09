import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalHeaderComponent } from '../../shared/arboles/portal-header/portal-header';
import { EvalHistoryCardComponent } from '../../shared/hojas/eval-history-card/eval-history-card';
import { EvalFormComponent } from '../../shared/ramas/eval-form/eval-form';
import { EvaluacionService, Evaluacion } from '../../core/services/evaluacion';

@Component({
  selector: 'app-gestion-habilidades',
  standalone: true,
  imports: [CommonModule, PortalHeaderComponent, EvalHistoryCardComponent, EvalFormComponent],
  templateUrl: './gestion-habilidades.html'
})
export class GestionHabilidadesComponent {
  private evaluacionService = inject(EvaluacionService);

  modoFormulario = signal(false);
  programaciones = signal<Evaluacion[]>(this.evaluacionService.getEvaluaciones());

  alternarVista() {
    this.modoFormulario.update(v => !v);
  }

  crearEvaluacion(data: any) {
    // 🛡️ Si data.horaInicio no viene, le asignamos un string vacío o un aviso
    const horaValida: string = data.horaInicio || 'Sin hora';

    const nueva: Evaluacion = {
      id: Date.now(),
      titulo: `Evaluación - ${data.fechaInicio}`,
      estado: 'PENDIENTE',
      fechaHabilitada: data.fechaInicio,
      horaInicio: horaValida // ✅ Ahora garantizamos que es un string
    };

    this.evaluacionService.agregarEvaluacion(nueva);
    this.programaciones.set(this.evaluacionService.getEvaluaciones());
    this.modoFormulario.set(false);
  }

  eliminar(id: number) {
    this.programaciones.update(list => list.filter(p => p.id !== id));
  }
}
