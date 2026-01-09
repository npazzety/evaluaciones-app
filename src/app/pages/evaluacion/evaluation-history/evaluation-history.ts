import { Component, Output, EventEmitter } from '@angular/core';
import { HistoryTableComponent } from '../../../shared/ramas/history-table/history-table';

@Component({
  selector: 'app-evaluation-history',
  standalone: true,
  imports: [HistoryTableComponent],
  templateUrl: './evaluation-history.html'
})
export class EvaluationHistoryComponent {
  @Output() onExport = new EventEmitter<void>();
}
