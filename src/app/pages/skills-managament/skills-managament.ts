import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalHeaderComponent } from '../../shared/arboles/portal-header/portal-header';
import { EvaluationDesignerComponent } from '../../shared/arboles/evaluation-designer/evaluation-designer';

@Component({
  selector: 'app-gestion-habilidades',
  standalone: true,
  imports: [CommonModule, PortalHeaderComponent, EvaluationDesignerComponent],
  templateUrl: './skills-managament.html'
})
export class GestionHabilidadesComponent {
  modoFormulario = signal(false);
  fecha = signal('');
  hora = signal('');

  habilidades = signal<any[]>([
    { id: 1, nombre: 'Comunicación Asertiva', seleccionada: false, ponderacion: 0 },
    { id: 2, nombre: 'Trabajo en Equipo', seleccionada: false, ponderacion: 0 },
    { id: 3, nombre: 'Resolución de Problemas', seleccionada: false, ponderacion: 0 },
    { id: 4, nombre: 'Liderazgo', seleccionada: false, ponderacion: 0 },
    { id: 5, nombre: 'Adaptabilidad', seleccionada: false, ponderacion: 0 },
    { id: 6, nombre: 'Gestión del Tiempo', seleccionada: false, ponderacion: 0 }
  ]);

  totalWeight = computed(() =>
    this.habilidades().filter(h => h.seleccionada).reduce((s, h) => s + h.ponderacion, 0)
  );

  selectedCount = computed(() =>
    this.habilidades().filter(h => h.seleccionada).length
  );

  sugerirPesosIA() {
    const seleccionadas = this.habilidades().filter(h => h.seleccionada);
    if (seleccionadas.length === 0) return;

    const pesoBase = Math.floor(100 / seleccionadas.length);
    let residuo = 100 % seleccionadas.length;

    this.habilidades.update(list => list.map(h => {
      if (h.seleccionada) {
        const extra = residuo > 0 ? 1 : 0;
        residuo--;
        return { ...h, ponderacion: pesoBase + extra };
      }
      return { ...h, ponderacion: 0 };
    }));
  }
  actualizarHabilidades() {
  // Al hacer un spread [...list] forzamos a Angular a detectar que el array cambió
  this.habilidades.update(actual => [...actual]);
}
  guardarEvaluacion() {
    console.log("Publicando:", {
      fecha: this.fecha(),
      hora: this.hora(),
      habilidades: this.habilidades().filter(h => h.seleccionada)
    });
    alert('¡Evaluación publicada!');
    this.modoFormulario.set(false);
  }
}
