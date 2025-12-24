import { Injectable, signal, effect } from '@angular/core';

export interface Habilidad {
  id: number;
  nombre: string;
  tipo: string;
  activa: boolean;
  nota?: number;
}

export interface Programacion {
  id: number;
  fechaInicio: string;
  horaInicio: string;
  habilitadoManual: boolean;
  habilidadesIds: number[];
}

@Injectable({ providedIn: 'root' })
export class HabilidadesService {
  // Señal para las habilidades base
  private listaHabilidades = signal<Habilidad[]>([
    { id: 1, nombre: 'Angular v19', tipo: 'Tecnica', activa: true },
    { id: 2, nombre: 'Comunicación Asertiva', tipo: 'Blanda', activa: false },
    { id: 3, nombre: 'Node.js / NestJS', tipo: 'Tecnica', activa: false },
    { id: 4, nombre: 'Liderazgo', tipo: 'Blanda', activa: false },
  ]);

  // Señal para el historial de evaluaciones
  private historialProgramaciones = signal<Programacion[]>([]);

  constructor() {
    // Cargar datos al iniciar
    const habsGuardadas = localStorage.getItem('habilidades_estado');
    if (habsGuardadas) this.listaHabilidades.set(JSON.parse(habsGuardadas));

    const histGuardado = localStorage.getItem('historial_evaluaciones');
    if (histGuardado) this.historialProgramaciones.set(JSON.parse(histGuardado));

    // Efecto para guardar automáticamente las habilidades
    effect(() => {
      localStorage.setItem('habilidades_estado', JSON.stringify(this.listaHabilidades()));
    });
  }

  getHabilidades() { return this.listaHabilidades; }

  getProgramaciones() { return this.historialProgramaciones; }

  toggleHabilidad(id: number) {
    this.listaHabilidades.update(habs =>
      habs.map(h => h.id === id ? { ...h, activa: !h.activa } : h)
    );
  }

  guardarEvaluacion(nueva: Programacion) {
    this.historialProgramaciones.update(prev => [nueva, ...prev]); // La más nueva primero
    localStorage.setItem('historial_evaluaciones', JSON.stringify(this.historialProgramaciones()));

    // IMPORTANTE: Seteamos la configuración activa para el empleado
    localStorage.setItem('config_evaluacion', JSON.stringify(nueva));
  }

  eliminarProgramacion(id: number) {
    this.historialProgramaciones.update(prev => prev.filter(p => p.id !== id));
    localStorage.setItem('historial_evaluaciones', JSON.stringify(this.historialProgramaciones()));
  }

obtenerUltimaProgramacion(): Programacion | null {
  const lista = this.historialProgramaciones();
  // Retornamos la primera (ya que las guardamos con [nueva, ...prev])
  return lista.length > 0 ? lista[0] : null;
}
}
