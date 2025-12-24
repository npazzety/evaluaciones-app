import { Component, signal, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HabilidadesService, Programacion } from '../../core/services/habilidades';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-evaluacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './evaluacion.html'
})
export class Evaluacion implements OnInit, OnDestroy {
  private habilidadesService = inject(HabilidadesService);
  private relojInterval: any;

  // Estados para controlar la vista del HTML
  habilidadesActivas = signal<any[]>([]);
  evaluacionSeleccionada = signal<boolean>(false);
  accesoPermitido = signal<boolean>(false);
  mensajeError = signal<string>('Buscando programaciones activas...');

  ngOnInit() {
    // Primera verificación al cargar
    this.verificarCronograma();

    // Verificación constante cada 2 segundos (Reloj)
    this.relojInterval = setInterval(() => {
      this.verificarCronograma();
    }, 2000);
  }

  ngOnDestroy() {
    if (this.relojInterval) clearInterval(this.relojInterval);
  }

  verificarCronograma() {
    // Obtenemos la última programación creada en Gestión
    const ultimaConfig = this.habilidadesService.obtenerUltimaProgramacion();

    if (!ultimaConfig) {
      this.accesoPermitido.set(false);
      this.mensajeError.set('No hay evaluaciones programadas en el historial.');
      return;
    }

    const ahora = new Date();

    // Parseo de la fecha programada (YYYY-MM-DD y HH:mm)
    const [year, month, day] = ultimaConfig.fechaInicio.split('-').map(Number);
    const [hours, minutes] = ultimaConfig.horaInicio.split(':').map(Number);
    const fechaInicioProg = new Date(year, month - 1, day, hours, minutes);

    // Lógica de habilitación
    const tiempoCumplido = ahora.getTime() >= fechaInicioProg.getTime();

    if (ultimaConfig.habilitadoManual && tiempoCumplido) {
      // Solo cargamos habilidades si el acceso acaba de permitirse
      if (!this.accesoPermitido()) {
        this.accesoPermitido.set(true);
        this.cargarHabilidadesDeLaEvaluacion(ultimaConfig.habilidadesIds);
        console.log("✅ Evaluación habilitada correctamente.");
      }
    } else {
      this.accesoPermitido.set(false);
      if (!ultimaConfig.habilitadoManual) {
        this.mensajeError.set('La evaluación ha sido pausada por el administrador.');
      } else {
        this.mensajeError.set(`Estará disponible el ${ultimaConfig.fechaInicio} a las ${ultimaConfig.horaInicio}`);
      }
    }
  }

  cargarHabilidadesDeLaEvaluacion(idsPermitidos: number[]) {
    const todasLasHabilidades = this.habilidadesService.getHabilidades()();

    // Filtramos solo las que el jefe marcó para esta evaluación específica
    // y añadimos la propiedad 'nota' para cumplir con la interfaz (TS2741)
    const mapeadas = todasLasHabilidades
      .filter(h => idsPermitidos.includes(h.id))
      .map(h => ({
        ...h,
        nota: 5 // Nota inicial por defecto
      }));

    this.habilidadesActivas.set(mapeadas);
  }

  // --- MÉTODOS DE LA INTERFAZ ---

  abrirEvaluacion() {
    if (this.habilidadesActivas().length === 0) {
      alert("La evaluación no contiene habilidades.");
      return;
    }
    this.evaluacionSeleccionada.set(true);
  }

  cancelar() {
    this.evaluacionSeleccionada.set(false);
  }

  enviarEvaluacion() {
    // Aquí podrías enviar los datos a un backend
    console.log("Resultados enviados:", this.habilidadesActivas());
    alert('¡Autoevaluación enviada con éxito!');
    this.evaluacionSeleccionada.set(false);
  }

  descargarPDF() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Reporte de Autoevaluación', 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [['Competencia', 'Tipo', 'Nota Autocalificada']],
      body: this.habilidadesActivas().map(h => [h.nombre, h.tipo, h.nota]),
      theme: 'grid',
      headStyles: { fillColor: [63, 81, 181] } // Color primario
    });

    doc.save(`Evaluacion_${new Date().toLocaleDateString()}.pdf`);
  }
}
