import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-skill-designer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './skill-designer.html'
})
export class SkillDesignerComponent {
  habilidades = signal([
    { nombre: 'Comunicación Asertiva', seleccionada: false, ponderacion: 0 },
    { nombre: 'Trabajo en Equipo', seleccionada: false, ponderacion: 0 },
    { nombre: 'Resolución de Problemas', seleccionada: false, ponderacion: 0 },
    { nombre: 'Liderazgo', seleccionada: false, ponderacion: 0 },
    { nombre: 'Adaptabilidad', seleccionada: false, ponderacion: 0 }
  ]);

  selectedCount = computed(() => this.habilidades().filter(h => h.seleccionada).length);
  totalWeight = computed(() => this.habilidades().reduce((acc, h) => acc + h.ponderacion, 0));

  toggleHabilidad(skill: any) {
    this.habilidades.update(list => list.map(h =>
      h.nombre === skill.nombre ? { ...h, seleccionada: !h.seleccionada } : h
    ));
  }

  sugerirPesosIA() {
    const seleccionadas = this.habilidades().filter(h => h.seleccionada);
    if (seleccionadas.length === 0) return;

    const pesoBase = Math.floor(100 / seleccionadas.length);
    let resto = 100 % seleccionadas.length;

    this.habilidades.update(list => list.map(h => {
      if (h.seleccionada) {
        const extra = resto > 0 ? 1 : 0;
        resto--;
        return { ...h, ponderacion: pesoBase + extra };
      }
      return { ...h, ponderacion: 0 };
    }));
  }
}
