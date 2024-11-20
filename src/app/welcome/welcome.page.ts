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
    "¡Bienvenido a nuestro sistema!",
    "¡Estamos felices de verte!",
    "¡Explora todas las funcionalidades!",
    "¡Tu experiencia comienza ahora!"
  ];

    // Arreglo de imágenes que cambiarán junto con los mensajes
  images: string[] = [
    "assets/imgs/pato.png",
    "assets/imgs/welcome-image2.png",
    "assets/imgs/welcome-image3.png",
    "assets/imgs/welcome-image4.png"
  ];
  currentMessageIndex: number = 0;  // Índice para cambiar el mensaje
  welcomeMessage: string = this.welcomeMessages[this.currentMessageIndex];  // Mensaje actual
  currentImage: string = this.images[this.currentMessageIndex];  // Imagen actual

  constructor(private router: Router) {}

  // Función que cambia el mensaje y la imagen cuando se presiona el botón
  changeMessage() {
    // Incrementar el índice para obtener el siguiente mensaje
    this.currentMessageIndex = (this.currentMessageIndex + 1) % this.welcomeMessages.length;
    this.welcomeMessage = this.welcomeMessages[this.currentMessageIndex];

    // Cuando lleguemos al último mensaje, redirigimos a la página 'main'
    if (this.currentMessageIndex === this.welcomeMessages.length - 1) {
      setTimeout(() => {
        this.router.navigate(['/main']); // Navega a la página 'main'
      }, 1000);  // Puedes darle un pequeño retraso antes de redirigir (1 segundo)
    }
  }
}
