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

  datosHistorial = signal([
    { habilidad: 'Liderazgo y Gestión', miNota: 95, notaJefe: 90, fecha: 'Enero 2026', icono: 'fa-brain', color: 'blue' },
    { habilidad: 'Comunicación Asertiva', miNota: 85, notaJefe: 95, fecha: 'Diciembre 2025', icono: 'fa-comments', color: 'purple' },
    { habilidad: 'Resolución de Problemas', miNota: 100, notaJefe: 92, fecha: 'Noviembre 2025', icono: 'fa-lightbulb', color: 'orange' },
    { habilidad: 'Trabajo en Equipo', miNota: 88, notaJefe: 88, fecha: 'Octubre 2025', icono: 'fa-users', color: 'green' },
    { habilidad: 'Adaptabilidad', miNota: 90, notaJefe: 85, fecha: 'Septiembre 2025', icono: 'fa-arrows-rotate', color: 'teal' }
  ]);

  descargarPDF() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(0, 40, 85);
    doc.text('Reporte Comparativo de Desempeño 2026', 14, 22);

    autoTable(doc, {
      startY: 30,
      head: [['Habilidad / Competencia', 'Autoevaluación', 'Evaluación Jefe', 'Diferencia']],
      body: this.datosHistorial().map(d => [
        d.habilidad,
        `${d.miNota}%`,
        `${d.notaJefe}%`,
        `${d.notaJefe - d.miNota}%`
      ]),
      headStyles: { fillColor: [0, 40, 85], fontStyle: 'bold' },
      theme: 'striped'
    });

    doc.save('reporte-desempeño-completo.pdf');
  }
}
