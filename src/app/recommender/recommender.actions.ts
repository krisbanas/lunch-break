import {GoogleMap} from "@angular/google-maps";
import {Restaurant, SearchSettings} from "./recommender.model";

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

export class SetLocalizationPoint {
  static readonly type = 'Set Localization Point';
  constructor(public localizationPoint: google.maps.LatLngLiteral) {}
}

export class SetMap {
  static readonly type = 'Set Map';
  constructor(public map: GoogleMap) {}
}

export class SetRestaurant {
  static readonly type = 'Set Restaurant';
  constructor(public restaurant: Restaurant | undefined) {}
}

export class SetTimeOnFootMessage {
  static readonly type = 'Set Time On Foot Message';
  constructor(public message: string) {}
}

export class SetSearchSettings {
  static readonly type = 'Set Search Settings';
  constructor(public searchSettings: SearchSettings) {}
}
