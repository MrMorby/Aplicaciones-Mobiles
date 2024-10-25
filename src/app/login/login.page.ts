import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../services/database.service';
import { AuthService } from '../services/auth.service';

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
    private dbService: DatabaseService, // Servicio de base de datos
    private authService: AuthService // Servicio de autenticación
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
        .then((result) => {
          if (result.isValid && result.userId) {
            console.log('Inicio de sesión exitoso');

            this.authService.setAuthenticated(true, result.userId)
              .then(() => {
                this.router.navigate(['/main']);
              })
              .catch(error => console.error('Error al guardar el estado de autenticación:', error));
          } else {
            console.log('Correo o contraseña incorrectos');
          }
        })
        .catch((error) => console.error('Error validando usuario:', error));
    } else {
      console.log('Formulario inválido');
    }
  }

}
