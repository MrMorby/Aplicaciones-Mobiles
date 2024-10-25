import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  if (await authService.checkAuthentication()) {
    return true;
  } else {
    snackBar.open('Acceso denegado. Necesitas iniciar sesión.', 'Cerrar', {
      duration: 3000
    });
    router.navigate(['/login']);
    return false;
  }
};

