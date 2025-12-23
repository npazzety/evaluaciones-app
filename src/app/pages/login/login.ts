import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html'
})
export class Login {
  loginForm: FormGroup;
  passwordVisible = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  mostrarPassword() { this.passwordVisible = true; }
  ocultarPassword() { this.passwordVisible = false; }

  ingresar() {
  if (this.loginForm.valid) {
    const { email } = this.loginForm.value;

    // 1. Definimos quiénes pueden entrar (Simulando base de datos)
    const usuariosPermitidos = ['jefe@test.com', 'empleado@test.com', 'test@espresso.com'];

    // 2. Verificamos si el correo está en la lista
    if (!usuariosPermitidos.includes(email)) {
      alert('Acceso denegado: Este correo no está registrado en el sistema.');
      return;
    }

    // 3. Si el correo es válido, guardamos la sesión
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);

    // 4. Redireccionamos según el rol
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
