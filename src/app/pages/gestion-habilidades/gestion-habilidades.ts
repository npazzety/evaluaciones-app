import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HabilidadesService, Programacion } from '../../core/services/habilidades';

@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-habilidades.html'
})
export class GestionHabilidades {
  habilidadesService = inject(HabilidadesService);

  // Acceso a las signals del servicio
  habilidades = this.habilidadesService.getHabilidades();
  programaciones = this.habilidadesService.getProgramaciones();

  tabActiva = signal<'crear' | 'historial'>('crear');

  nuevaConfig = {
    fechaInicio: '',
    horaInicio: '',
    habilitadoManual: true
  };

  crearEvaluacion() {
    if (!this.nuevaConfig.fechaInicio || !this.nuevaConfig.horaInicio) {
      alert("Por favor completa fecha y hora.");
      return;
    }

    const idsActivos = this.habilidades()
      .filter(h => h.activa)
      .map(h => h.id);

    if (idsActivos.length === 0) {
      alert("Debes activar al menos una habilidad para evaluar.");
      return;
    }

    const nueva: Programacion = {
      id: Date.now(),
      ...this.nuevaConfig,
      habilidadesIds: idsActivos
    };

    this.habilidadesService.guardarEvaluacion(nueva);
    alert("🚀 Evaluación Programada y Habilitada");
    this.tabActiva.set('historial');
  }

  eliminar(id: number) {
    if(confirm('¿Eliminar esta programación?')) {
      this.habilidadesService.eliminarProgramacion(id);
    }
  }
}
