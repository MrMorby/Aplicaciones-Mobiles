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

  async setAuthenticated(status: boolean): Promise<void> {
    this.isAuthenticated = status;
    await this.storage.set('isAuthenticated', status);
  }

  async logout(): Promise<void> {
    this.isAuthenticated = false;
    await this.storage.remove('isAuthenticated');
  }
}
