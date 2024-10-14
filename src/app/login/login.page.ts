import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dbService: DatabaseService // Inyectar el servicio de base de datos
  ) {
    // Inicializa el formulario reactivo con validación
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Validar usuario en la base de datos
      this.dbService.validateUser(email, password)
        .then((isValid) => {
          if (isValid) {
            console.log('Inicio de sesión exitoso');
            this.router.navigate(['/main']); // Redirige a la página deseada tras iniciar sesión
          } else {
            console.log('Correo o contraseña incorrectos');
          }
        })
        .catch((e) => console.error('Error validando usuario', e));
    } else {
      console.log('Formulario inválido');
    }
  }

}
