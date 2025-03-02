import {RecommenderModel, Restaurant, SearchSettings} from "./recommender.model";
import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {HttpClient} from "@angular/common/http";
import {
  FindNearbyRestaurant,
  LoadMap,
  SetLocalizationPoint,
  SetMap,
  SetRestaurant,
  SetSearchSettings,
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
    localizationPoint: RecommenderState.HEADQUARTERS_LOCATION,
    map: undefined,
    timeOnFootMessage: "",
    searchSettings: RecommenderState.DEFAULT_SETTINGS
  }
})
@Injectable()
export class RecommenderState {

  // The key is restricted. Kindly refrain from using it as it won't work anyway.
  private apiKey = 'AIzaSyC6tYHeycWdh160NR39JdzEHlQK2ldUtQY';
  private httpClient: HttpClient;
  private loadedAlready = false;
  private restaurantFinderService: RestaurantFinderService;
  static HEADQUARTERS_LOCATION = {lat: 47.38781073871699, lng: 8.521104878257187};
  static DEFAULT_SETTINGS = {distance: 500, minStars: 3.8, minDollar: 1, maxDollar: 3};

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
  static getLocalizationPoint(state: RecommenderModel): google.maps.LatLngLiteral {
    return state.localizationPoint;
  }

  @Selector()
  static getMap(state: RecommenderModel): GoogleMap | undefined {
    return state.map;
  }

  @Selector()
  static getTimeOnFootMessage(state: RecommenderModel): String {
    return state.timeOnFootMessage;
  }

  @Selector()
  static getSearchSettings(state: RecommenderModel): SearchSettings {
    return state.searchSettings;
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
  findNearbyRestaurant(ctx: StateContext<RecommenderModel>, {map}: FindNearbyRestaurant) {
    this.restaurantFinderService.findNearbyRestaurants(map)
  }

  @Action(SetStartPoint)
  setStartPoint(ctx: StateContext<RecommenderModel>, {startPoint}: SetStartPoint) {
    ctx.patchState({startPoint: startPoint})
  }

  @Action(SetLocalizationPoint)
  setLocalizationPoint(ctx: StateContext<RecommenderModel>, {localizationPoint}: SetLocalizationPoint) {
    ctx.patchState({localizationPoint: localizationPoint})
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

  @Action(SetSearchSettings)
  setSearchSettings(ctx: StateContext<RecommenderModel>, {searchSettings}: SetSearchSettings) {
    ctx.patchState({searchSettings: searchSettings})
  }
}
