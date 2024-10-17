import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicateProductPageRoutingModule } from './publicate-product-routing.module';

import { PublicateProductPage } from './publicate-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicateProductPageRoutingModule
  ],
  declarations: [PublicateProductPage]
})
export class PublicateProductPageModule {}
