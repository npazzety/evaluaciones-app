import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Evaluacion {
  id: number;
  titulo: string;
  estado: 'PENDIENTE' | 'COMPLETADO';
  fechaHabilitada: string;
  horaInicio: string;
}

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {
  private readonly DB_KEY = 'evaluaciones_db';

  // Este Subject avisará a todos los componentes cuando haya cambios
  private evaluacionesSub = new BehaviorSubject<Evaluacion[]>(this.getEvaluacionesDesdeStorage());
  evaluaciones$ = this.evaluacionesSub.asObservable();

  private getEvaluacionesDesdeStorage(): Evaluacion[] {
    const data = localStorage.getItem(this.DB_KEY);
    return data ? JSON.parse(data) : [];
  }

  getEvaluaciones(): Evaluacion[] {
    return this.getEvaluacionesDesdeStorage();
  }

  agregarEvaluacion(nueva: Evaluacion): void {
    const actuales = this.getEvaluacionesDesdeStorage();
    actuales.push(nueva);
    localStorage.setItem(this.DB_KEY, JSON.stringify(actuales));
    // Notificamos a todos los que estén escuchando
    this.evaluacionesSub.next(actuales);
  }
}
