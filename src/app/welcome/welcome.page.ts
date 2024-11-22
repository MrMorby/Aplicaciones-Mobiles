import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-welcome',
  templateUrl: 'welcome.page.html',
  styleUrls: ['welcome.page.scss'],
  animations: [
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
  welcomeMessages: string[] = [
    "¡Bienvenido a Donut!",
    '¡Aqui podras comprar desde <br> donde quieras!',
    "¡Y vender desde donde quieras!",
    "¡Explora todas las funcionalidades!"
  ];
  images: string[] = [
    "assets/imgs/buy_now.png",
    "assets/imgs/compras.png",
    "assets/imgs/vender.png",
    "assets/imgs/buy_now.png"
  ];
  currentMessageIndex: number = 0;
  welcomeMessage: string = this.welcomeMessages[this.currentMessageIndex];
  currentImage: string = this.images[this.currentMessageIndex];
  isLoading: boolean = false; // Estado de carga

  constructor(private router: Router) {}

  changeMessage() {
    this.currentMessageIndex += 1;

    if (this.currentMessageIndex === this.welcomeMessages.length) {
      this.isLoading = true; // Mostrar la pantalla de bloqueo
      this.router.navigate(['/main']).then(() => {
        window.location.reload();
      });
    } else {
      this.welcomeMessage = this.welcomeMessages[this.currentMessageIndex];
      this.currentImage = this.images[this.currentMessageIndex];
    }
  }
}
