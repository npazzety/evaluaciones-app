import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent implements OnInit {
  @Output() toggleEvent = new EventEmitter<void>();

  emailUsuario: string | null = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Obtenemos el correo del localStorage o del servicio que uses
    this.emailUsuario = localStorage.getItem('userEmail');
    // Si estás probando a mano, puedes dejarlo fijo:
    // this.emailUsuario = 'jefe@test.com';
  }

  emitToggle() {
    this.toggleEvent.emit();
  }

  logout() {
    console.log('Ejecutando Logout...');
    localStorage.removeItem('userEmail'); // Limpiamos la sesión
    this.router.navigate(['/login']); // Redirigimos
  }
}
