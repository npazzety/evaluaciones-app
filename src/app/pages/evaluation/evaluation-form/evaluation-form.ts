import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillRatingCardComponent } from '../../../shared/hojas/skill-rating-card/skill-rating-card';

@Component({
  selector: 'app-evaluation-form',
  standalone: true,
  imports: [CommonModule, SkillRatingCardComponent],
  templateUrl: './evaluation-form.html'
})
export class EvaluationFormComponent {
  @Input() habilidades: any[] = [];
  @Output() onCancel = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<void>();
}
