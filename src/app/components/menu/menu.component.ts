import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  constructor(private router: Router, private authService: AuthService) {}

  async logout(): Promise<void> {
      try {
          // Configura el estado de autenticación como no autenticado
          await this.authService.setAuthenticated(false);

          console.log('Sesión cerrada exitosamente');

          // Redirigir al usuario a la página principal
          this.router.navigate(['/home']);
      } catch (error) {
          console.error('Error al cerrar sesión:', error);
      }
  }
}
