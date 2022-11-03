import {RecommenderModel, Restaurant} from "./recommender.model";
import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {HttpClient} from "@angular/common/http";
import {
  FindNearbyRestaurant,
  LoadMap,
  SetMap,
  SetRestaurant,
  SetStartPoint,
  SetTimeOnFootMessage
} from "./recommender.actions";
import {RestaurantFinderService} from "../restaurant-finder/restaurant-finder.service";
import {GoogleMap} from "@angular/google-maps";

@State<RecommenderModel>({
  name: 'recommender_model',
  defaults: {
    isLoadingMap: true,
    restaurant: undefined,
    startPoint: RecommenderState.HEADQUARTERS_LOCATION,
    map: undefined,
    timeOnFootMessage: ""
  }
})
@Injectable()
export class RecommenderState {

  // The key is restricted to the website's hostname. Kindly refrain from using it as it won't work anyway.
  private apiKey = 'AIzaSyC6tYHeycWdh160NR39JdzEHlQK2ldUtQY';
  private httpClient: HttpClient;
  private loadedAlready = false;
  private restaurantFinderService: RestaurantFinderService;
  static HEADQUARTERS_LOCATION = {lat: 47.38451663274026, lng: 8.492158461253029};

  constructor(httpClient: HttpClient, restaurantFinderService: RestaurantFinderService) {
    this.httpClient = httpClient;
    this.restaurantFinderService = restaurantFinderService;
  }

  @Selector()
  static isLoadingMap(state: RecommenderModel): boolean {
    return state.isLoadingMap;
  }

  @Selector()
  static getRestaurant(state: RecommenderModel): Restaurant | undefined {
    return state.restaurant;
  }

  @Selector()
  static getStartPoint(state: RecommenderModel): google.maps.LatLngLiteral {
    return state.startPoint;
  }

  @Selector()
  static getMap(state: RecommenderModel): GoogleMap | undefined {
    return state.map;
  }

  @Selector()
  static getTimeOnFootMessage(state: RecommenderModel): String {
    return state.timeOnFootMessage;
  }

  @Action(LoadMap)
  loadMap(ctx: StateContext<RecommenderModel>) {
    if (this.loadedAlready) return;

    this.httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&libraries=places', 'callback')
      .subscribe(() => {
          ctx.patchState({isLoadingMap: false});
          this.loadedAlready = true;
        }
      );
  }

  @Action(FindNearbyRestaurant)
  findNearbyRestaurant(ctx: StateContext<RecommenderModel>, {map}:FindNearbyRestaurant) {
    this.restaurantFinderService.findNearbyRestaurants(map)
  }

  @Action(SetStartPoint)
  setStartPoint(ctx: StateContext<RecommenderModel>, {startPoint}: SetStartPoint) {
    ctx.patchState({startPoint: startPoint})
  }

  @Action(SetMap)
  setMap(ctx: StateContext<RecommenderModel>, {map}: SetMap) {
    ctx.patchState({map: map})
  }

  @Action(SetRestaurant)
  setRestaurant(ctx: StateContext<RecommenderModel>, {restaurant}: SetRestaurant) {
    ctx.patchState({restaurant: restaurant})
  }

  @Action(SetTimeOnFootMessage)
  setTimeOnFootMessage(ctx: StateContext<RecommenderModel>, {message}: SetTimeOnFootMessage) {
    ctx.patchState({timeOnFootMessage: message})
  }
}
