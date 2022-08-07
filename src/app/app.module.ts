import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {TopBarComponent} from './top-bar/top-bar.component';
import {BottomBarComponent} from './bottom-bar/bottom-bar.component';
import {RecommenderComponent} from './recommender/recommender.component';
import {MapViewComponent} from './map-view/map-view.component';
import {GoogleMapsModule} from "@angular/google-maps";
import {NgxsModule} from "@ngxs/store";
import {RecommenderState} from "./recommender/recommender.state";

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
    )
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    BottomBarComponent,
    RecommenderComponent,
    MapViewComponent,
    RecommenderComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
