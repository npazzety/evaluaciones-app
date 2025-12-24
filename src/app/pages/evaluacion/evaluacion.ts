import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-evaluacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './evaluacion.html'
})
export class Evaluacion {
  // Se agrega la propiedad 'nota' para controlarla individualmente
  habilidadesActivas = signal([
    { id: 1, nombre: 'Angular v19', tipo: 'Hard', nota: 5 },
    { id: 2, nombre: 'Comunicación Asertiva', tipo: 'Soft', nota: 5 }
  ]);

  evaluacionSeleccionada = signal<boolean>(false);

  abrirEvaluacion() {
    this.evaluacionSeleccionada.set(true);
  }

  cancelar() {
    this.evaluacionSeleccionada.set(false);
  }

  enviarEvaluacion() {
    alert('¡Tu autoevaluación ha sido enviada con éxito!');
    this.evaluacionSeleccionada.set(false);
  }

  descargarPDF() {
    const doc = new jsPDF();
    doc.text('Reporte de Evaluación 2025', 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [['Habilidad', 'Nota']],
      body: this.habilidadesActivas().map(h => [h.nombre, h.nota])
    });
    doc.save('mi_historial.pdf');
  }
}
