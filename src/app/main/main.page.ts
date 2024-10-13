import { Component } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage {

  products = [
    {
      image: 'assets/images/product1.jpg',
      title: 'Producto 1',
      price: '$100.00'
    },
    {
      image: 'assets/images/product2.jpg',
      title: 'Producto 2',
      price: '$150.00'
    },
    {
      image: 'assets/images/product3.jpg',
      title: 'Producto 3',
      price: '$200.00'
    }
  ];

  animation: any;

  constructor() {}
}
