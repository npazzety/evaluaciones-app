import { Injectable, signal } from '@angular/core';
import { Habilidad } from '../models/habilidad.model';

@Injectable({
  providedIn: 'root'
})
export class HabilidadesService {
  // Usaremos WritableSignal para que Angular detecte cambios automáticamente
  private listaHabilidades = signal<Habilidad[]>([
    { id: 1, nombre: 'Angular v19', tipo: 'Tecnica', activa: true },
    { id: 2, nombre: 'Comunicación Asertiva', tipo: 'Blanda', activa: false },
    { id: 3, nombre: 'Node.js / NestJS', tipo: 'Tecnica', activa: true },
    { id: 4, nombre: 'Liderazgo', tipo: 'Blanda', activa: false },
  ]);

  getHabilidades() {
    return this.listaHabilidades;
  }

  toggleHabilidad(id: number) {
    this.listaHabilidades.update(habs =>
      habs.map(h => h.id === id ? { ...h, activa: !h.activa } : h)
    );
  }
}
