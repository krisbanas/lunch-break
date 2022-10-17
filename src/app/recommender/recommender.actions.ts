import {GoogleMap} from "@angular/google-maps";
import {Restaurant} from "./recommender.model";

export class LoadMap {
  static readonly type = 'Load Map';
  constructor() {}
}

export class FindNearbyRestaurant {
  static readonly type = 'Find Nearby Restaurant';
  constructor(public map: GoogleMap) {}
}

export class SetStartPoint {
  static readonly type = 'Set Start Point';
  constructor(public startPoint: google.maps.LatLngLiteral) {}
}

export class SetMap {
  static readonly type = 'Set Map';
  constructor(public map: GoogleMap) {}
}

export class SetRestaurant {
  static readonly type = 'Set Restaurant';
  constructor(public restaurant: Restaurant) {}
}
