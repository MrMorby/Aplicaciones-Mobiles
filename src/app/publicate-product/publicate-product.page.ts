import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-publicate-product',
  templateUrl: './publicate-product.page.html',
  styleUrls: ['./publicate-product.page.scss'],
})
export class PublicateProductPage implements OnInit {
  productoForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // inicializamos los controles del formulario con validadores
    this.productoForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      precio: ['', [Validators.required, Validators.min(1)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.productoForm.valid) {
      // lógica para enviar el producto cuando el formulario es válido
      console.log('Formulario válido', this.productoForm.value);
    } else {
      // muestra un mensaje de error si el formulario es inválido
      console.log('Formulario inválido');
    }
  }

  // método para acceder fácilmente a los controles del formulario desde el html
  get formControls() {
    return this.productoForm.controls;
  }
}
