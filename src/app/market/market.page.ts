import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-market',
  templateUrl: './market.page.html',
  styleUrls: ['./market.page.scss'],
})
export class MarketPage implements AfterViewInit {
  // Referencia al elemento de animación en el HTML
  @ViewChild('animationContainer', { static: false }) animationContainer!: ElementRef;

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

  constructor(private animationCtrl: AnimationController) {}

  // Este método se llama después de que la vista esté completamente inicializada
  ngAfterViewInit() {
    if (this.animationContainer) {
      this.createAnimation();
    } else {
      console.error('animationContainer is not available');
    }
  }

  // Crea la animación utilizando el AnimationController
  createAnimation() {
    this.animation = this.animationCtrl.create()
      .addElement(this.animationContainer.nativeElement) // Selecciona el elemento de animación
      .duration(2000)  // Duración de la animación en milisegundos
      .iterations(Infinity)  // Repite la animación infinitamente
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '1' },
        { offset: 0.5, transform: 'scale(1.5)', opacity: '0.5' },
        { offset: 1, transform: 'scale(1)', opacity: '1' }
      ]);
  }

  // Métodos para controlar la animación
  play() {
    this.animation.play();
  }

  pause() {
    this.animation.pause();
  }

  stop() {
    this.animation.stop();
  }
}
