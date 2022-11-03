import {AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChild} from '@angular/core';
import {map, Observable, Subscription} from "rxjs";
import {GoogleMap, MapDirectionsService, MapMarker} from "@angular/google-maps";
import {Select, Store} from "@ngxs/store";
import {RecommenderState} from "../recommender/recommender.state";
import {Restaurant} from "../recommender/recommender.model";
import {RestaurantFinderService} from "../restaurant-finder/restaurant-finder.service";
import {FindNearbyRestaurant, SetMap, SetStartPoint, SetTimeOnFootMessage} from "../recommender/recommender.actions";

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit, OnDestroy, AfterViewInit {

  @Select(RecommenderState.getRestaurant) restaurant$: Observable<Restaurant>;
  @Select(RecommenderState.getStartPoint) startPoint$: Observable<google.maps.LatLngLiteral>;

  restaurant: Restaurant | undefined;
  startPoint: google.maps.LatLngLiteral;
  subscription: Subscription[] = [];
  directionsResults$: Observable<google.maps.DirectionsResult | undefined>;
  firstCentering = RecommenderState.HEADQUARTERS_LOCATION

  @ViewChild(GoogleMap, {static: false}) mapQueryList: GoogleMap

  mapDirectionsService: MapDirectionsService
  restaurantFinderService: RestaurantFinderService

  constructor(mapDirectionsService: MapDirectionsService, restaurantFinderService: RestaurantFinderService, private store: Store) {
    this.mapDirectionsService = mapDirectionsService
    this.restaurantFinderService = restaurantFinderService
  }

  ngAfterViewInit(): void {
    this.store.dispatch(new SetMap(this.mapQueryList))
  }

  ngOnInit(): void {
    this.subscription = [
      ...this.subscription,
      this.restaurant$.subscribe((restaurant) => this.showDirectionsToRestaurant(restaurant)),
      this.startPoint$.subscribe((startPoint) => this.startPoint = startPoint)
    ]
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe())
  }

  private showDirectionsToRestaurant(res: Restaurant) {
    this.restaurant = res
    console.log("Calculating directions for: ", res)
    let request: google.maps.DirectionsRequest = {
      destination: this.restaurant,
      origin: this.startPoint,
      travelMode: google.maps.TravelMode.WALKING
    };
    this.directionsResults$ = this.mapDirectionsService.route(request).pipe(map((response) => {
      let result = response.result
      let text = result?.routes[0].legs[0].duration?.text;
      this.store.dispatch(new SetTimeOnFootMessage(text || ""))
      return result
    }));
  }

  marker: google.maps.Marker = createMarker(RecommenderState.HEADQUARTERS_LOCATION.lat, RecommenderState.HEADQUARTERS_LOCATION.lng)

  handleClickOnMap(event: google.maps.MapMouseEvent | google.maps.IconMouseEvent) {
    if (event.latLng == null) return
    console.log("Current location: ", this.startPoint)
    this.store.dispatch(new SetStartPoint({lat: event.latLng!.lat(), lng: event.latLng!.lng()}))

    this.marker = createMarker(event.latLng!.lat(), event.latLng!.lng())
  }
}

// TODO create better markers
function createMarker(lat: number, lng: number) {
  return new google.maps.Marker({
    position: {
      lat: lat,
      lng: lng,
    },
    icon: '/marker.png',
    label: {
      color: 'red',
      text: 'Marker label ',
    },
    title: 'Marker title ',
    animation: google.maps.Animation.BOUNCE,
  });
}
