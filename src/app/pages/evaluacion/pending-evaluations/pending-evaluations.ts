import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pending-evaluations',
  standalone: true,
  templateUrl: './pending-evaluations.html'
})
export class PendingEvaluationsComponent {
  @Output() onStart = new EventEmitter<void>(); // Avisa al padre para cambiar de vista
}
