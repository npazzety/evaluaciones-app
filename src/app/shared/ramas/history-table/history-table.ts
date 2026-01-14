import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history-table.html'
})
export class HistoryTableComponent {
  // Aquí podrías recibir la lista de evaluaciones pasadas
  @Output() onDownload = new EventEmitter<void>();
}
