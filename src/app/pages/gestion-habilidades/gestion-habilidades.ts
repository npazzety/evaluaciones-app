import { Component, inject } from '@angular/core';
import { HabilidadesService } from '../../core/services/habilidades';

@Component({
  selector: 'app-gestion',
  standalone: true,
  templateUrl: './gestion-habilidades.html'
})
export class GestionHabilidades {
  habilidadesService = inject(HabilidadesService);
  habilidades = this.habilidadesService.getHabilidades(); // Esto es una Signal

  cambiarEstado(id: number) {
    this.habilidadesService.toggleHabilidad(id);
  }
}
