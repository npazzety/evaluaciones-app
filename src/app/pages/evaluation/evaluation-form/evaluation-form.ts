import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SkillRatingCardComponent } from "../../../shared/hojas/skill-rating-card/skill-rating-card";
// Importa aquí tu componente de las tarjetas de habilidades
// import { SkillRatingCardComponent } from './skill-rating-card/skill-rating-card';

@Component({
  selector: 'app-evaluation-form',
  standalone: true,
  imports: [CommonModule, SkillRatingCardComponent], // Añade SkillRatingCardComponent a los imports
  templateUrl: './evaluation-form.html',
})
export class EvaluationFormComponent implements OnInit {
  evalId: string | null = '';

  // Mock de habilidades para el @for
  habilidades = [
    { id: 1, nombre: 'Comunicación Asertiva', descripcion: 'Capacidad de expresar ideas con claridad.' },
    { id: 2, nombre: 'Resolución de Problemas', descripcion: 'Eficacia ante obstáculos técnicos.' },
    { id: 3, nombre: 'Liderazgo', descripcion: 'Influencia positiva en el equipo.' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.evalId = this.route.snapshot.paramMap.get('id');
  }

  cancelar() {
    this.router.navigate(['/dashboard/evaluacion/nueva']);
  }

  enviar() {
    console.log('Enviando evaluación:', this.evalId);
    // Aquí iría la lógica de tu servicio
    this.router.navigate(['/dashboard/evaluacion/nueva']);
  }
}
