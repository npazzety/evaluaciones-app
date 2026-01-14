import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-skill-selector-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './skill-selector-item.html'
})
export class SkillSelectorItemComponent {
  @Input() skill: any;
  @Output() changed = new EventEmitter<void>();

  onToggle() {
    if (!this.skill.seleccionada) {
      this.skill.ponderacion = 0;
    }
    this.changed.emit();
  }
}
