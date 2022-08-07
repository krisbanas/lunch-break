export interface RecommenderModel {
  isLoadingMap: boolean;
  restaurant: Restaurant | undefined;
}

export class Restaurant {
  name: String;
  lat: number;
  lng: number;
}
