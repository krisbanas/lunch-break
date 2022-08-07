import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {RecommenderState} from "./recommender.state";
import {Observable, Subscription} from "rxjs";
import {FindRestaurant, LoadMap} from "./recommender.actions";
import {Restaurant} from "./recommender.model";

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
  isLoadingMap = true;

  @Select(RecommenderState.isLoadingMap) isLoadingMap$: Observable<boolean>;
  @Select(RecommenderState.getRestaurant) restaurant$: Observable<Restaurant>;

  constructor(private store: Store) {
    store.dispatch(LoadMap)
  }

  ngOnInit(): void {
    this.subscription = [
      ...this.subscription,
      this.isLoadingMap$.subscribe((result) => this.isLoadingMap = result),
      this.restaurant$.subscribe((result) => this.restaurant = result)
    ]
  }

  async findRestaurant() {
    this.isLoading = true;
    this.store.dispatch(FindRestaurant).subscribe(
      (_) => {
        console.log("Found!", this.restaurant?.name!)
      }
    )
    await new Promise(r => setTimeout(r, 500));

    this.isClicked = true;
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe())
  }
}
