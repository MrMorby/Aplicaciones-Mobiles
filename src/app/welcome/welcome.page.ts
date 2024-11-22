import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-welcome',
  templateUrl: 'welcome.page.html',
  styleUrls: ['welcome.page.scss'],
  animations: [
    // Animación de Fade para el texto
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class WelcomePage {

  // Mensajes de bienvenida que cambiarán al hacer click
  welcomeMessages: string[] = [
    "¡Bienvenido a Donut!",
    '¡Aqui podras comprar desde <br> donde quieras!',
    "¡Y vender desde donde quieras!",
    "¡Explora todas las funcionalidades!" 
  ];
    // Arreglo de imágenes que cambiarán junto con los mensajes
  images: string[] = [
    "assets/imgs/buy_now.png",
    "assets/imgs/compras.png",
    "assets/imgs/vender.png",
    "assets/imgs/buy_now.png" 
  ];
  currentMessageIndex: number = 0;  // Índice para cambiar el mensaje
  welcomeMessage: string = this.welcomeMessages[this.currentMessageIndex];  // Mensaje actual
  currentImage: string = this.images[this.currentMessageIndex];  // Imagen actual

  constructor(private router: Router) {}
  // Función que cambia el mensaje y la imagen cuando se presiona el botón
  changeMessage() {
    // Incrementar el índice para obtener el siguiente mensaje
    this.currentMessageIndex = (this.currentMessageIndex + 1);
    this.welcomeMessage = this.welcomeMessages[this.currentMessageIndex];
    this.currentImage = this.images[this.currentMessageIndex];

    // Cuando lleguemos al último mensaje, redirigimos a la página 'main'
    if (this.currentMessageIndex === this.welcomeMessages.length) {
        this.router.navigate(['/main']); // Navega a la página 'main'
    }
    console.log(this.currentMessageIndex)
    console.log(this.currentMessageIndex)

  }
}
