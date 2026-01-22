import { Component, signal, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pending-evaluations',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pending-evaluations.html'
})
export class PendingEvaluationsComponent {
  @Output() onStart = new EventEmitter<void>();

  // Evaluación estática para enfoque en diseño
  evaluacionesDisponibles = signal([
    {
      id: 1,
      titulo: 'Evaluación Anual de Competencias 2026',
      fecha: '2026-01-13',
      hora: '09:00',
      descripcion: 'Evaluación técnica de habilidades blandas y conocimientos de área.'
    }
  ]);

  entrarAEvaluar() {
    this.onStart.emit();
  }
}
