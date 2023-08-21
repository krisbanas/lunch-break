import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {SetLocalizationPoint} from "../recommender/recommender.actions";

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private store: Store) {}

  locateUser() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const {latitude, longitude} = position.coords;
          const startPoint: google.maps.LatLngLiteral = {lat: latitude, lng: longitude};

          // Dispatch an action to update startPoint in your NGXS state
          this.store.dispatch(new SetLocalizationPoint(startPoint));
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    } else {
      console.error('Geolocation is not available in this browser.');
    }
  }
}
