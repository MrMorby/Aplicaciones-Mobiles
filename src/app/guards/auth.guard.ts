import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  if (authService.checkAuthentication()) {
    return true;
  } else {
    // Mostrar un mensaje de error si no está autenticado
    snackBar.open('Acceso denegado. Necesitas iniciar sesión.', 'Cerrar', {
      duration: 3000
    });

    // Opcionalmente, podrías redirigir a una página específica
    router.navigate(['/login']);
    return false;
  }
};
