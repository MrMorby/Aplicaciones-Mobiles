import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  password: string = '';
  confirmPassword: string = '';

  constructor(private navCtrl: NavController) {}

  onSubmit() {
    if (this.password === this.confirmPassword) {
      // Aquí puedes manejar el envío de la nueva contraseña
      console.log('Nueva contraseña:', this.password);
    } else {
      console.log('Las contraseñas no coinciden');
    }
  }
}
