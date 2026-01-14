import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleFormComponent } from '../../hojas/schedule-form/schedule-form';
import { SkillListContainerComponent } from '../../hojas/skill-list-container/skill-list-container';
import { WeightCardComponent } from '../../ramas/weight-card/weight-card';

@Component({
  selector: 'app-evaluation-designer',
  standalone: true,
  imports: [
    CommonModule,
    ScheduleFormComponent,
    SkillListContainerComponent,
    WeightCardComponent
  ],
  templateUrl: './evaluation-designer.html'
})
export class EvaluationDesignerComponent {
  @Input() skills: any[] = [];
  @Input() totalWeight: number = 0;
  @Input() selectedCount: number = 0;
  @Input() fecha: string = '';
  @Input() hora: string = '';

  // Eventos para que la página principal reaccione
  @Output() onSkillUpdate = new EventEmitter<void>();
  @Output() onIAAdjust = new EventEmitter<void>();
  @Output() onPublish = new EventEmitter<void>();

  // Eventos para actualizar fecha y hora
  @Output() fechaChange = new EventEmitter<string>();
  @Output() horaChange = new EventEmitter<string>();

  get isReadyToPublish(): boolean {
    return this.totalWeight === 100 && this.fecha !== '' && this.hora !== '';
  }
}
