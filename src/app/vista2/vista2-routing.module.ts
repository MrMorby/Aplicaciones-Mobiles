import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Vista2Page } from './vista2.page';

const routes: Routes = [
  {
    path: '',
    component: Vista2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Vista2PageRoutingModule {}
