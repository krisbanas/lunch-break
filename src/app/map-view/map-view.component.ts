import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, map, Observable, of, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MapDirectionsRenderer, MapDirectionsService} from "@angular/google-maps";
import {Select} from "@ngxs/store";
import {RecommenderState} from "../recommender/recommender.state";
import {Restaurant} from "../recommender/recommender.model";

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit, OnDestroy {

  @Select(RecommenderState.getRestaurant) restaurant$: Observable<Restaurant>;

  restaurant: Restaurant | undefined;
  subscription: Subscription[] = [];
  directionsResults$: Observable<google.maps.DirectionsResult | undefined>;
  timeOnFoot: string | undefined;

  headquartersLocation: google.maps.LatLngLiteral = {
    lat: 47.38451663274026, lng: 8.492158461253029
  };

  mapDirectionsService: MapDirectionsService

  constructor(mapDirectionsService: MapDirectionsService) {
    this.mapDirectionsService = mapDirectionsService
  }

  ngOnInit(): void {
    this.subscription = [
      ...this.subscription,
      this.restaurant$.subscribe((res) => {
          this.showDirectionsToRestaurant(res);
        }
      ),
      this.directionsResults$.subscribe((res) => {
          this.timeOnFoot = res?.routes[0].legs[0].duration?.text
        }
      )
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
      origin: this.headquartersLocation,
      travelMode: google.maps.TravelMode.WALKING
    };
    this.directionsResults$ = this.mapDirectionsService.route(request).pipe(map((response) => response.result));
  }
}
