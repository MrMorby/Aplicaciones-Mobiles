import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private storage: Storage) {
    this.init();
  }

  private async init() {
    await this.storage.create();
    const storedAuth = await this.storage.get('isAuthenticated');
    this.isAuthenticated = !!storedAuth;
  }

  async checkAuthentication(): Promise<boolean> {
    const storedAuth = await this.storage.get('isAuthenticated');
    return !!storedAuth;
  }

  async setAuthenticated(status: boolean, userId?: number): Promise<void> {
    this.isAuthenticated = status;
    await this.storage.set('isAuthenticated', status);

    if (status && userId) {
      // Almacena el user_id cuando el usuario se autentica
      await this.storage.set('user_id', userId);
    } else if (!status) {
      // Elimina el user_id al cerrar sesión
      await this.storage.remove('user_id');
    }
  }

  async logout(): Promise<void> {
    this.isAuthenticated = false;
    await this.storage.remove('isAuthenticated');
  }

  async getUserId(): Promise<number | null> {
    // Recupera el user_id del almacenamiento
    const userId = await this.storage.get('user_id');
    return userId ? parseInt(userId) : null;
  }
}
