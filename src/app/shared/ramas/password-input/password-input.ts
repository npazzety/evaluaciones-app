import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ReactiveFormsModule, FormControl } from "@angular/forms";
import { InputComponent } from "../../hojas/input/input";

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent], // Importa la hoja Input
  templateUrl: './password-input.html'
})
export class PasswordInputComponent {
  @Input() control: any;
  passwordVisible: boolean = false;

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }
}
