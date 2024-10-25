import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { AuthService } from '../services/auth.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.page.html',
  styleUrls: ['./my-products.page.scss'],
})
export class MyProductsPage implements OnInit {
  userProducts = [];

  constructor(
    private dbService: DatabaseService,
    private authService: AuthService,
    private alertController: AlertController, // Para confirmar la eliminación
    private toastController: ToastController  // Para mostrar mensajes de éxito/error
  ) {}

  async ngOnInit() {
    try {
      const userId = await this.authService.getUserId();
      if (!userId) throw new Error('Usuario no autenticado');

      // Obtén los productos del usuario autenticado
      this.userProducts = await this.dbService.getUserProducts(userId);
    } catch (error) {
      console.error('Error al cargar los productos del usuario:', error);
    }
  }

  // Confirmar eliminación
  async confirmDelete(productId: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta publicación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // Cancelado
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.dbService.deleteProduct(productId); // Eliminar el producto si el usuario confirma
          }
        }
      ]
    });

    await alert.present();
  }
}
