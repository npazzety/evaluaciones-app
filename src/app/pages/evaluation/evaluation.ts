import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HabilidadesService } from '../../core/services/habilidades';
import { PortalHeaderComponent } from '../../shared/arboles/portal-header/portal-header';
import { SkillRatingCardComponent } from '../../shared/hojas/skill-rating-card/skill-rating-card';
import { AccessDeniedComponent } from '../../shared/ramas/access-denied/access-denied';
import { HistoryTableComponent } from '../../shared/ramas/history-table/history-table';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable' ;

@Component({
  selector: 'app-evaluacion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PortalHeaderComponent,
    SkillRatingCardComponent,
    AccessDeniedComponent,
    HistoryTableComponent
  ],
  templateUrl: './evaluation.html'
})
export class Evaluacion implements OnInit {
  private habilidadesService = inject(HabilidadesService);

  // ESTADOS (Acceso directo para pruebas)
  habilidadesActivas = signal<any[]>([]);
  evaluacionSeleccionada = signal<boolean>(false);
  accesoPermitido = signal<boolean>(true); // Forzado a true sin backend
  mensajeError = signal<string>('');

  ngOnInit() {
    this.cargarDatosPrueba();
  }

  cargarDatosPrueba() {
    // Intentamos traer del servicio, si no, generamos datos locales
    const configuracion = this.habilidadesService.obtenerUltimaProgramacion();
    const todas = this.habilidadesService.getHabilidades()();

    if (configuracion && todas.length > 0) {
      const filtradas = todas
        .filter(h => configuracion.habilidadesIds.includes(h.id))
        .map(h => ({ ...h, nota: 0 }));
      this.habilidadesActivas.set(filtradas);
    } else {
      // Datos por defecto si el servicio está vacío
      this.habilidadesActivas.set([
        { id: 1, nombre: 'Comunicación Asertiva', ponderacion: 30, nota: 0 },
        { id: 2, nombre: 'Trabajo en Equipo', ponderacion: 40, nota: 0 },
        { id: 3, nombre: 'Resolución de Problemas', ponderacion: 30, nota: 0 }
      ]);
    }
  }

  abrirEvaluacion() { this.evaluacionSeleccionada.set(true); }
  cancelar() { this.evaluacionSeleccionada.set(false); }

  enviarEvaluacion() {
    alert('¡Evaluación enviada con éxito!');
    this.evaluacionSeleccionada.set(false);
  }

  descargarPDF() {
    const doc = new jsPDF();
    doc.text('Reporte de Autoevaluación', 14, 20);
    autoTable(doc, {
      startY: 25,
      head: [['Habilidad', 'Nota']],
      body: this.habilidadesActivas().map(h => [h.nombre, h.nota]),
      headStyles: { fillColor: [26, 58, 10] } // Verde Bosque
    });
    doc.save('mi_evaluacion.pdf');
  }
}
