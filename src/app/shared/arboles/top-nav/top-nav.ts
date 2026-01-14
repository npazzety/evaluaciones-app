import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-nav.html'
})
export class TopNavComponent {
  // Aquí podrías agregar lógica para mostrar el nombre de la página actual dinámicamente
}
