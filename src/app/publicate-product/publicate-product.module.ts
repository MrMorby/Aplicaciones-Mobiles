import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // importa ReactiveFormsModule
import { IonicModule } from '@ionic/angular';

import { PublicateProductPageRoutingModule } from './publicate-product-routing.module';

import { PublicateProductPage } from './publicate-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // importa ReactiveFormsModule aquí
    IonicModule,
    PublicateProductPageRoutingModule
  ],
  declarations: [PublicateProductPage]
})
export class PublicateProductPageModule {}
