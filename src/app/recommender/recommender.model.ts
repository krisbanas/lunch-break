import {GoogleMap} from "@angular/google-maps";

export interface RecommenderModel {
  isLoadingMap: boolean;
  restaurant: Restaurant | undefined;
  startPoint: google.maps.LatLngLiteral
  map: GoogleMap | undefined
  timeOnFootMessage: string
}

export class Restaurant {
  name: String;
  lat: number;
  lng: number;
  link: String;
}
