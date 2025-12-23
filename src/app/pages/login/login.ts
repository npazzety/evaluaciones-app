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

    if (email === 'jefe@test.com') {
      // Si el jefe gestiona habilidades:
      this.router.navigate(['/dashboard/gestion']);
    } else {
      // Si el empleado se evalúa:
      this.router.navigate(['/dashboard/evaluacion']);
    }
  } else {
    this.loginForm.markAllAsTouched();
  }
}
}
