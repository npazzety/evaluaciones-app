import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-access-denied',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './access-denied.html'
})
export class AccessDeniedComponent {
  @Input() mensaje: string = '';
  @Output() onRefresh = new EventEmitter<void>();
}
