import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {TopBarComponent} from './top-bar/top-bar.component';
import {RecommenderComponent} from './recommender/recommender.component';
import {MapViewComponent} from './map-view/map-view.component';
import {GoogleMapsModule} from "@angular/google-maps";
import {NgxsModule} from "@ngxs/store";
import {RecommenderState} from "./recommender/recommender.state";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {InfoModalComponent} from "./info-modal/info-modal.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    HttpClientJsonpModule,
    NgxsModule.forRoot(
      [RecommenderState],
      {selectorOptions: {suppressErrors: true}}
    ),
    NgbModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    RecommenderComponent,
    MapViewComponent,
    RecommenderComponent,
    InfoModalComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
