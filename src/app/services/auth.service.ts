import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false; // Variable para almacenar el estado de autenticación

  constructor() { }

  // Método para verificar si el usuario está autenticado
  checkAuthentication(): boolean {
    return this.isAuthenticated;
  }

  // Método para actualizar el estado de autenticación
  setAuthenticated(status: boolean): void {
    this.isAuthenticated = status;
  }
}
