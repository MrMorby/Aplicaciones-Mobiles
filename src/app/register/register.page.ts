import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dbService: DatabaseService // Inyectar el servicio de base de datos
  ) {}

  ngOnInit() {
    // Inicializa el formulario reactivo con validaciones
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  // Maneja el envío del formulario
  onSubmit() {
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;

      // Llamada al método de la base de datos para agregar el usuario
      this.dbService.createUser(username, email, password)
        .then(() => {
          console.log('Usuario registrado exitosamente');
          this.router.navigate(['/main']); // Redirige al usuario a la página principal
        })
        .catch((e) => console.error('Error registrando usuario', e));
    } else {
      console.log('Formulario inválido');
    }
  }
}
