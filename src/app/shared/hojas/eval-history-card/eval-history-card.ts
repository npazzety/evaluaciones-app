import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eval-history-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eval-history-card.html'
})
export class EvalHistoryCardComponent {
  @Input() fecha!: string | Date;
  @Input() hora!: string;
  @Output() onDelete = new EventEmitter<void>();
}
