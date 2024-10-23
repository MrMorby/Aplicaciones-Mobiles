
import { Component, AfterViewInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';  // Importa el plugin de Geolocation

declare var google: any;

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
  latitude: number;
  longitude: number;

  constructor() {}

  ngAfterViewInit() {
    //this.loadMap();
    this.getUserLocation();
  }

  // Función para obtener la ubicación del usuario
  async getUserLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
      console.log('Ubicación actual:', this.latitude, this.longitude);

      // Una vez obtenida la ubicación, cargamos el mapa centrado en la ubicación actual
      this.loadMap(this.latitude, this.longitude);

    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
      // Si hay algún error, podemos cargar el mapa con una ubicación por defecto
      this.loadMap(-33.447487, -70.673676);  // Santiago, Chile (por defecto)
    }
  }

  // Modificamos la función loadMap para aceptar latitud y longitud como parámetros
  loadMap(lat: number, lng: number) {
    const mapOptions = {
      center: new google.maps.LatLng(lat, lng),  // Centramos el mapa en la ubicación actual
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  handleRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }


}
