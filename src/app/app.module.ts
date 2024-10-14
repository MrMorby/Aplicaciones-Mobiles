import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http'; // Import for HTTP requests
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; // Import for SQLite

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule // Add HttpClientModule here
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, SQLite],
  bootstrap: [AppComponent],
})
export class AppModule {}
