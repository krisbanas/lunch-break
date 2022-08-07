import {Injectable} from "@angular/core";
import {Restaurant} from "../recommender/recommender.model";

@Injectable({
  providedIn: 'root',
})
export class RestaurantFinderService {
  private restaurants = [
    {name: "La Taverna 🍕", lat: 47.388153847815154, lng: 8.486561599618312},
    {name: "La Taqueria 🌮", lat: 47.388153847815154, lng: 8.486561599618312},
    {name: "Burgermeister 🍔", lat: 47.388153847815154, lng: 8.486561599618312},
    {name: "Taj Mahal 🍛", lat: 47.388153847815154, lng: 8.486561599618312},
    {name: "Buckhuser 🥓", lat: 47.388153847815154, lng: 8.486561599618312},
    {name: "Not Guilty Thai 🍛", lat: 47.388153847815154, lng: 8.486561599618312},
    {name: "Orient 🌯", lat: 47.388153847815154, lng: 8.486561599618312},
    {name: "Musti Grill 🍖", lat: 47.388153847815154, lng: 8.486561599618312},
    {name: "Memo Kebab 🌯", lat: 47.388153847815154, lng: 8.486561599618312}
  ]

  constructor() {
  }

  public findRestaurant(): Restaurant {
    let random = Math.floor(Math.random() * this.restaurants.length);
    return this.restaurants[random];
  }
}
