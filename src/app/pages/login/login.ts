import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BrandSidebar } from "../../shared/ramas/brand-sidebar/brand-sidebar";
import { PasswordInputComponent } from "../../shared/ramas/password-input/password-input";
import { InputComponent } from "../../shared/hojas/input/input";
import { AuthCard } from "../../shared/arboles/auth-card/auth-card";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BrandSidebar, PasswordInputComponent, InputComponent, AuthCard],
  templateUrl: './login.html'
})
export class Login {
  loginForm: FormGroup;
  passwordVisible = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      // Validación: Requerido y formato email
      email: ['', [Validators.required, Validators.email]],
      // Validación: Requerido y mínimo 4 caracteres
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  mostrarPassword() { this.passwordVisible = true; }
  ocultarPassword() { this.passwordVisible = false; }

  ingresar() {
  console.log('Intentando ingresar...');

  if (this.loginForm.valid) {
    const { email } = this.loginForm.value;

    // 1. LISTA DE USUARIOS PERMITIDOS (O puedes validar por dominio @espressoamericano.com.hn)
    const usuariosPermitidos = ['jefe@test.com', 'empleado@test.com'];

    if (!usuariosPermitidos.includes(email)) {
      alert('Acceso denegado: Este correo no está registrado en el sistema.');
      return; // Detiene la ejecución aquí
    }

    // 2. Si es un usuario permitido, guardamos sesión
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);

    // 3. Navegación
    if (email === 'jefe@test.com') {
      this.router.navigate(['/dashboard/gestion']);
    } else {
      this.router.navigate(['/dashboard/evaluacion']);
    }
  } else {
    this.loginForm.markAllAsTouched();
  }
}
}
