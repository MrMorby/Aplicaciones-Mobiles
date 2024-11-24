
import { Component, AfterViewInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Geolocation } from '@capacitor/geolocation';

declare var google: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage {
  products = [];
  filteredProducts = []; // Lista de productos filtrados
  latitude: number;
  longitude: number;
  loading = true; // Indicador de carga

  constructor(private dbService: DatabaseService) {}

  async ngOnInit() {
    this.loading = true; // Inicia el spinner
  }

  async ionViewWillEnter() {
    try {
      this.products = await this.dbService.readProducts();
      this.filteredProducts = this.products;
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    } finally {
      this.loading = false; // Detiene el spinner
    }
  }

  ngAfterViewInit() {
    this.getUserLocation();
  }

  async getUserLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
      this.loadMap(this.latitude, this.longitude);
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
      this.loadMap(-33.447487, -70.673676); // Santiago, Chile (por defecto)
    }
  }

  loadMap(lat: number, lng: number) {
    const mapOptions = {
      center: new google.maps.LatLng(lat, lng),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  handleRefresh(event) {
    setTimeout(async () => {
      this.loading = true;
      try {
        this.products = await this.dbService.readProducts();
      } catch (error) {
        console.error('Error al refrescar los productos:', error);
      } finally {
        this.loading = false;
        event.target.complete();
      }
    }, 2000);
  }

  filterProducts(event: any) {
    const query = event.target.value.toLowerCase(); // Obtén el texto del buscador
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(query) // Filtro por nombre (insensible a mayúsculas)
    );
  }
}
