import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-skill-rating-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './skill-rating-card.html'
})
export class SkillRatingCardComponent {
  @Input() habilidad: any;
}
