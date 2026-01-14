import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weight-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weight-card.html'
})
export class WeightCardComponent {
  @Input() total: number = 0;
  @Output() onSuggestIA = new EventEmitter<void>();
}
