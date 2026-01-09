import { Component, signal, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HabilidadesService } from '../../core/services/habilidades';
import { PortalHeaderComponent } from '../../shared/arboles/portal-header/portal-header';
import { SkillRatingCardComponent } from '../../shared/hojas/skill-rating-card/skill-rating-card';
import { AccessDeniedComponent } from '../../shared/ramas/access-denied/access-denied';
import { HistoryTableComponent } from '../../shared/ramas/history-table/history-table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
  templateUrl: './evaluacion.html'
})
export class Evaluacion implements OnInit, OnDestroy {
  private habilidadesService = inject(HabilidadesService);
  private relojInterval: any;

  // Estados
  habilidadesActivas = signal<any[]>([]);
  evaluacionSeleccionada = signal<boolean>(false);
  accesoPermitido = signal<boolean>(false);
  mensajeError = signal<string>('Verificando disponibilidad...');

  ngOnInit() {
    this.verificarCronograma();
    this.relojInterval = setInterval(() => this.verificarCronograma(), 1000);
  }

  ngOnDestroy() {
    if (this.relojInterval) clearInterval(this.relojInterval);
  }

  verificarCronograma() {
    const ultimaConfig = this.habilidadesService.obtenerUltimaProgramacion();
    if (!ultimaConfig) {
      this.accesoPermitido.set(false);
      this.mensajeError.set('No hay evaluaciones programadas.');
      return;
    }

    const ahora = new Date();
    const [year, month, day] = ultimaConfig.fechaInicio.split('-').map(Number);
    const [hours, minutes] = ultimaConfig.horaInicio.split(':').map(Number);
    const fechaProg = new Date(year, month - 1, day, hours, minutes);

    if (ultimaConfig.habilitadoManual && ahora.getTime() >= fechaProg.getTime()) {
      if (!this.accesoPermitido()) {
        this.accesoPermitido.set(true);
        this.cargarHabilidades(ultimaConfig.habilidadesIds);
      }
    } else {
      this.accesoPermitido.set(false);
      this.mensajeError.set(`Disponible el ${ultimaConfig.fechaInicio} a las ${ultimaConfig.horaInicio}`);
    }
  }

  cargarHabilidades(ids: number[]) {
    const todas = this.habilidadesService.getHabilidades()();
    const mapeadas = todas
      .filter(h => ids.includes(h.id))
      .map(h => ({ ...h, nota: 5 }));
    this.habilidadesActivas.set(mapeadas);
  }

  abrirEvaluacion() { this.evaluacionSeleccionada.set(true); }
  cancelar() { this.evaluacionSeleccionada.set(false); }

  enviarEvaluacion() {
    alert('¡Evaluación enviada con éxito!');
    this.evaluacionSeleccionada.set(false);
  }

  descargarPDF() {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(0, 40, 85); // Azul Espresso Americano
    doc.text('Reporte de Autoevaluación', 14, 20);

    autoTable(doc, {
      startY: 25,
      head: [['Habilidad', 'Tipo', 'Nota']],
      body: this.habilidadesActivas().map(h => [h.nombre, h.tipo, h.nota]),
      headStyles: { fillColor: [0, 40, 85] }
    });
    doc.save('evaluacion_espresso.pdf');
  }
}
