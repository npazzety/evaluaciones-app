import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../shared/arboles/sidebar/sidebar';
import { TopNavComponent } from '../../shared/arboles/top-nav/top-nav';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, TopNavComponent],
  templateUrl: './dashboard.html'
})
export class DashboardComponent {
  // Ya no necesitas inyectar Router aquí si no haces lógica propia
}
