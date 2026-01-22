import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-evaluation-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evaluation-history.html'
})
export class EvaluationHistoryComponent {

  // Datos de ejemplo para la comparativa
  datosHistorial = signal([
    { habilidad: 'Comunicación Asertiva', miNota: 95, notaJefe: 90 },
    { habilidad: 'Trabajo en Equipo', miNota: 88, notaJefe: 92 },
    { habilidad: 'Resolución de Problemas', miNota: 100, notaJefe: 95 }
  ]);

  descargarPDF() {
    const doc = new jsPDF();

    // Título del PDF
    doc.setFontSize(18);
    doc.text('Reporte Comparativo de Desempeño 2025', 14, 22);

    // Generar tabla comparativa
    autoTable(doc, {
      startY: 30,
      head: [['Habilidad / Competencia', 'Mi Autoevaluación', 'Evaluación Jefe']],
      body: this.datosHistorial().map(d => [d.habilidad, d.miNota, d.notaJefe]),
      headStyles: { fillColor: [0, 40, 85] }, // Azul Espresso
      theme: 'striped'
    });

    doc.save('historial-evaluacion-2025.pdf');
  }
}
