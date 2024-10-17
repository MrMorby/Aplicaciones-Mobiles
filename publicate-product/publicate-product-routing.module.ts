import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicateProductPage } from './publicate-product.page';

const routes: Routes = [
  {
    path: '',
    component: PublicateProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicateProductPageRoutingModule {}
