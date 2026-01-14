import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillSelectorItemComponent } from '../../ramas/skill-selector-item/skill-selector-item';

@Component({
  selector: 'app-skill-list-container',
  standalone: true,
  imports: [CommonModule, SkillSelectorItemComponent],
  templateUrl: './skill-list-container.html'
})
export class SkillListContainerComponent {
  @Input() skills: any[] = [];
  @Input() selectedCount: number = 0;
  @Output() onUpdate = new EventEmitter<void>();
}
