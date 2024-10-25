import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Device } from '@capacitor/device';
import { DatabaseService } from '../services/database.service';

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
    private dbService: DatabaseService
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
        await this.dbService.createProduct(name, price, description, this.productImage);
        console.log('Producto creado exitosamente');
        // Agrega navegación o notificación de éxito
      } catch (error) {
        console.error('Error al crear el producto', error);
      }
    } else {
      console.log('Formulario incompleto o falta imagen');
    }
  }
}
