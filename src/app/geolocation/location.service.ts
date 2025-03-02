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
      navigator.permissions.query({name: 'geolocation'}).then((result) => {
        if (result.state === 'granted') {
          console.debug("Location access already granted.");
          this.runLocateQuery()
        } else if (result.state === 'prompt') {
          console.debug("Location access will be requested.");
          this.runLocateQuery()
        } else {
          console.debug("Location access denied. Ask user to enable it.");
          alert("Please enable location services in your browser settings.");
        }
      });
    } else {
      console.error('Geolocation is not available in this browser.');
    }
  }

  private runLocateQuery() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.debug('Geolocation success:', position.coords);
        this.store.dispatch(
          new SetLocalizationPoint({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        );
      },
      (error) => {
        console.error(`Geolocation error (code: ${error.code}): ${error.message}`);
        if (error.code === 1) {
          alert("Location access denied. Please enable it in browser settings.");
        }
      },
      {
        enableHighAccuracy: true, // Force GPS
        timeout: 20000,
        maximumAge: 0, // Prevent caching
      }
    );
  }
}
