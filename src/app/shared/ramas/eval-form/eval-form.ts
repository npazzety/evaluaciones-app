import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-eval-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './eval-form.html'
})
export class EvalFormComponent {
  @Output() onSave = new EventEmitter<{fechaInicio: string, horaInicio: string}>();

  nuevaConfig = {
    fechaInicio: '',
    horaInicio: ''
  };

  submit() {
    if(this.nuevaConfig.fechaInicio && this.nuevaConfig.horaInicio) {
      this.onSave.emit({...this.nuevaConfig});
      // Limpiar formulario tras emitir
      this.nuevaConfig = { fechaInicio: '', horaInicio: '' };
    }
  }
}
