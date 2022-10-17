import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {RecommenderState} from "./recommender.state";
import {Observable, Subscription} from "rxjs";
import {FindNearbyRestaurant, LoadMap} from "./recommender.actions";
import {Restaurant} from "./recommender.model";
import {GoogleMap} from "@angular/google-maps";

@Component({
  selector: 'app-recommender',
  templateUrl: './recommender.component.html',
  styleUrls: ['./recommender.component.css']
})
export class RecommenderComponent implements OnInit, OnDestroy {

  isClicked = false;
  restaurant: Restaurant | undefined;
  isLoading = false;
  subscription: Subscription[] = [];
  isLoadingMap = false; // TODO

  @Select(RecommenderState.isLoadingMap) isLoadingMap$: Observable<boolean>;
  @Select(RecommenderState.getMap) map$: Observable<GoogleMap>;
  @Select(RecommenderState.getRestaurant) restaurant$: Observable<Restaurant>;

  private map: GoogleMap;

  constructor(private store: Store) {
    store.dispatch(LoadMap)
  }

  ngOnInit(): void {
    this.subscription = [
      ...this.subscription,
      this.isLoadingMap$.subscribe((result) => this.isLoadingMap = result),
      this.restaurant$.subscribe((result) => this.restaurant = result),
      this.map$.subscribe((map) => this.map = map)
    ]
  }

  async findRestaurant() {
    this.isLoading = true;
    this.store.dispatch(new FindNearbyRestaurant(this.map))
    // TODO await new Promise(r => setTimeout(r, 500));

    this.isClicked = true;
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe())
  }
}
