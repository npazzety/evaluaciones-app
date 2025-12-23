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
  // Simulación de habilidades enviadas por el jefe
  // Si dejas este array vacío [], verás el mensaje de "No habilitado"
  habilidadesActivas = signal([
    { id: 1, nombre: 'Angular v19', tipo: 'Hard' },
    { id: 2, nombre: 'Comunicación Asertiva', tipo: 'Soft' }
  ]);

  // Controla si el usuario entró a ver el formulario
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
    // Aquí normalmente limpiarías el array o cambiarías el estado en la DB
  }

  descargarPDF() {
    const doc = new jsPDF();
    doc.text('Reporte de Evaluación 2024', 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [['Habilidad', 'Nota']],
      body: this.habilidadesActivas().map(h => [h.nombre, 'Pendiente'])
    });
    doc.save('mi_historial.pdf');
  }
}
