import { Component, AfterViewInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-market',
  templateUrl: './market.page.html',
  styleUrls: ['./market.page.scss'],
})
export class MarketPage implements AfterViewInit {

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

  constructor() { }

  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
    const mapOptions = {
      center: new google.maps.LatLng(-33.447487, -70.673676),  // Ejemplo: Santiago, Chile
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }
}
