import {GoogleMap} from "@angular/google-maps";

export interface RecommenderModel {
  isLoadingMap: boolean;
  restaurant: Restaurant | undefined;
  startPoint: google.maps.LatLngLiteral
  localizationPoint: google.maps.LatLngLiteral
  map: GoogleMap | undefined
  timeOnFootMessage: string
  searchSettings: SearchSettings
}

export interface Restaurant {
  name: String;
  lat: number;
  lng: number;
  link: String;
}

export interface SearchSettings {
  distance: number;
  minDollar: number;
  maxDollar: number;
  minStars: number;
}
