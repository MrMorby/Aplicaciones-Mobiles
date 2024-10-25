import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Device } from '@capacitor/device';
import { DatabaseService } from '../services/database.service';
import { AuthService } from '../services/auth.service';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-publicate-product',
  templateUrl: './publicate-product.page.html',
  styleUrls: ['./publicate-product.page.scss'],
})
export class PublicateProductPage implements OnInit {
  productForm: FormGroup;
  productImage: string | null = null;
  isWeb: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dbService: DatabaseService,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      description: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  async ngOnInit() {
    const info = await Device.getInfo();
    this.isWeb = info.platform === 'web';
  }

  // Método para cargar imagenes en web
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.productImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Método para cargar imagenes en Android/iOS
  async uploadImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
    });
    this.productImage = image.dataUrl;
  }

  async submitProduct() {
    if (this.productForm.valid && this.productImage) {
      const { name, price, description } = this.productForm.value;

      try {
        const userId = await this.authService.getUserId();
        if (!userId) throw new Error('Usuario no autenticado');

        await this.dbService.createProduct(name, price, description, this.productImage, userId);
        console.log('Producto creado exitosamente');

        // Muestra el mensaje de éxito y redirige a la página principal
        await this.showSuccessToast('¡Publicación exitosa!');
        this.router.navigate(['/main']).then(() => {
          // Fuerza una recarga de la página principal
          window.location.reload();
        });
      } catch (error) {
        console.error('Error al crear el producto', error);
      }
    } else {
      console.log('Formulario incompleto o falta imagen');
    }
  }



  private async showSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duración del mensaje en milisegundos
      position: 'bottom',
      color: 'success' // Color del toast
    });
    await toast.present();
  }

}
