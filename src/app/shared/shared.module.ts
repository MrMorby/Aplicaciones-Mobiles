import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BackButtonComponent } from '../components/back-button/back-button.component';

@NgModule({
  declarations: [BackButtonComponent],
  imports: [CommonModule, IonicModule],
  exports: [BackButtonComponent]
})
export class SharedModule {}
