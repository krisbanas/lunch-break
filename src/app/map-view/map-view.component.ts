import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MapDirectionsRenderer, MapDirectionsService} from "@angular/google-maps";

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit, OnDestroy {

  apiLoaded: Observable<boolean>;

  directionsResults$: Observable<google.maps.DirectionsResult | undefined> | undefined;
  directionsResult: google.maps.DirectionsResult | undefined

  httpClient: HttpClient
  headquartersLocation: google.maps.LatLngLiteral = {
    lat: 47.38451663274026, lng: 8.492158461253029
  };

  burgermeisterLocation: google.maps.LatLngLiteral = {
    lat: 47.388153847815154, lng: 8.486561599618312
  }

  mapDirectionsService: MapDirectionsService

  constructor(httpClient: HttpClient, mapDirectionsService: MapDirectionsService) {
    this.httpClient = httpClient
    this.mapDirectionsService = mapDirectionsService

    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyC6tYHeycWdh160NR39JdzEHlQK2ldUtQY', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  ngOnInit(): void {
    // const request: google.maps.DirectionsRequest = {
    //   destination: this.burgermeisterLocation,
    //   origin: this.headquartersLocation,
    //   travelMode: google.maps.TravelMode.WALKING
    // };
    // this.directionsResults$ = this.mapDirectionsService.route(request).pipe(map(response => response.result));

    // this.findDirections()
  }

  // findDirections() {
  //   const request: google.maps.DirectionsRequest = {
  //     destination: this.burgermeisterLocation,
  //     origin: this.headquartersLocation,
  //     travelMode: google.maps.TravelMode.WALKING
  //   };
  //   this.directionsResults$ = this.mapDirectionsService.route(request).pipe(map(response => response.result));
  // }

  ngOnDestroy() {
  }
}
