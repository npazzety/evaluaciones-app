import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedule-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule-form.html'
})
export class ScheduleFormComponent {
  @Input() fecha: string = '';
  @Input() hora: string = '';

  @Output() fechaChange = new EventEmitter<string>();
  @Output() horaChange = new EventEmitter<string>();

  onFechaChange(val: string) { this.fechaChange.emit(val); }
  onHoraChange(val: string) { this.horaChange.emit(val); }
}
