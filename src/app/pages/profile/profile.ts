import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true, // Asumiendo que usas standalone por tu estructura de app.routes
  imports: [CommonModule],
  templateUrl: './profile.html',
})
export class ProfileComponent implements OnInit {

  // Definimos el objeto user que el HTML está buscando
  public user = {
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'j.perez@espresso.com',
    role: 'Colaborador',
    id: '20251004'
  };

  constructor() { }

  ngOnInit(): void {
    // Aquí es donde en el futuro llamarás a tu servicio
    // para obtener los datos de la BD rígida de 100k usuarios
  }
}
