import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  constructor(private menuController: MenuController, private router: Router, private authService: AuthService) {}

  async logout(): Promise<void> {
      try {
          // Configura el estado de autenticación como no autenticado
          await this.authService.setAuthenticated(false);
          console.log('Sesión cerrada exitosamente');
          this.menuController.close('first').then(() => {
            // Lógica para cerrar sesión (limpiar tokens, redirigir, etc.)
            localStorage.clear(); // Ejemplo: limpiar datos de sesión
            this.router.navigate(['/home']); // Redirige a la página de login
          });
      } catch (error) {
          console.error('Error al cerrar sesión:', error);
      }
  }
}
