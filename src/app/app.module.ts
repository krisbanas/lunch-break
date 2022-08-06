import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { MiddlePanelComponent } from './middle-panel/middle-panel.component';
import { MapViewComponent } from './map-view/map-view.component';
import {GoogleMapsModule} from "@angular/google-maps";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    HttpClientJsonpModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    BottomBarComponent,
    MiddlePanelComponent,
    MapViewComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
