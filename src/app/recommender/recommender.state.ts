import {RecommenderModel, Restaurant} from "./recommender.model";
import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {HttpClient} from "@angular/common/http";
import {FindRestaurant, LoadMap} from "./recommender.actions";
import {RestaurantFinderService} from "../restaurant-finder/restaurant-finder.service";

@State<RecommenderModel>({
  name: 'recommender_model',
  defaults: {
    isLoadingMap: true,
    restaurant: undefined
  }
})
@Injectable()
export class RecommenderState {

  private apiKey = 'AIzaSyC6tYHeycWdh160NR39JdzEHlQK2ldUtQY';
  private httpClient: HttpClient;
  private loadedAlready = false;
  private restaurantFinderService: RestaurantFinderService;

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

  @Action(LoadMap)
  loadMap(ctx: StateContext<RecommenderModel>) {
    if (this.loadedAlready) return;

    this.httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=' + this.apiKey, 'callback')
      .subscribe(
        () => {
          ctx.patchState({isLoadingMap: false});
          this.loadedAlready = true;
        }
      );
  }

  @Action(FindRestaurant)
  findRestaurant(ctx: StateContext<RecommenderModel>) {
    ctx.patchState({restaurant: this.restaurantFinderService.findRestaurant()})
  }
}
