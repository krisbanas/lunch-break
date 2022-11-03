import {Injectable} from "@angular/core";
import {Restaurant} from "../recommender/recommender.model";
import {Store} from "@ngxs/store";
import {SetRestaurant} from "../recommender/recommender.actions";
import {GoogleMap} from "@angular/google-maps";

@Injectable({providedIn: 'root'})
export class RestaurantFinderService {

  private static readonly URL_BASE = "https://www.google.com/maps/search/?api=1&query=restaurant&query_place_id=";
  private static readonly EIFFEL_TOWER_PLACE_ID = "ChIJLU7jZClu5kcR4PcOOO6p3I0";
  private static readonly placeIdRegex = RegExp("^[-_A-Za-z0-9]*$");

  private startPoint: google.maps.LatLngLiteral;
  private cache: Map<google.maps.LatLngLiteral, Restaurant[]> = new Map();

  constructor(private store: Store) { }

  public findNearbyRestaurants(map: GoogleMap) {
    let snapshot = this.store.snapshot()
    this.startPoint = snapshot.recommender_model.startPoint

    if (this.cache.has(this.startPoint)) {
      console.debug("Find nearby restaurants - cache hit!")
      let restaurantsFromCache = this.cache.get(this.startPoint)!;
      this.chooseRandomRestaurantFrom(restaurantsFromCache);
      return
    }

    console.debug("Find nearby restaurants - cache miss!")

    let request: google.maps.places.PlaceSearchRequest = {
      location: this.startPoint,
      maxPriceLevel: 3,
      openNow: true,
      radius: 500,
      type: 'restaurant'
    };

    let service = new google.maps.places.PlacesService(map.googleMap!);
    service.nearbySearch(request, (result, status) => this.callback(result, status));
  }

  public callback(results: google.maps.places.PlaceResult[] | null, status: any) {
    if (results == null || status != google.maps.places.PlacesServiceStatus.OK) {
      console.log("error!")
      this.store.dispatch(new SetRestaurant(undefined));
      return
    }

    let restaurants = RestaurantFinderService.parseRestaurantSearchResult(results)

    this.cache.set(this.startPoint, restaurants)

    // TODO Trivial cache invalidation - do an LRU or something later
    if (this.cache.size > 100) this.cache.clear()

    this.chooseRandomRestaurantFrom(restaurants)
  }

  private static parseRestaurantSearchResult(results: google.maps.places.PlaceResult[]) {
    return results
      .filter(x => x.rating && x.rating > 3.5)
      .filter(x => x.types?.indexOf('gas_station') == -1)
      .map((x) => {
        return {
          name: x.name!,
          lat: x.geometry?.location?.lat()!,
          lng: x.geometry?.location?.lng()!,
          link: this.createPlaceId(x.place_id!)
        };
      });
  }

  private static createPlaceId(placeId: string) {
    return this.placeIdRegex.test(placeId) ? this.URL_BASE + placeId : this.URL_BASE + this.EIFFEL_TOWER_PLACE_ID
  }

  private chooseRandomRestaurantFrom(restaurants: Restaurant[]) {
    let random = Math.floor(Math.random() * restaurants.length);
    let restaurant = restaurants[random];
    restaurants.splice(random, 1)
    this.store.dispatch(new SetRestaurant(restaurant));
  }
}
