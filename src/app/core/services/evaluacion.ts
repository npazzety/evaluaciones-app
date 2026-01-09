import { Injectable } from '@angular/core';

// Definición del "contrato" de datos
export interface Evaluacion {
  id: number;
  titulo: string;
  estado: 'PENDIENTE' | 'COMPLETADO';
  fechaHabilitada: string;
  horaInicio?: string; // 👈 Propiedad añadida para evitar el error ts(2353)
  respuestas?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {
  private readonly DB_KEY = 'evaluaciones_db';

  getEvaluaciones(): Evaluacion[] {
    const data = localStorage.getItem(this.DB_KEY);
    return data ? JSON.parse(data) : [];
  }

  agregarEvaluacion(nueva: Evaluacion): void {
    const actuales = this.getEvaluaciones();
    actuales.push(nueva);
    localStorage.setItem(this.DB_KEY, JSON.stringify(actuales));
  }
}
