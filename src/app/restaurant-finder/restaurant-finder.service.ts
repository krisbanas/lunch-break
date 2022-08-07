import {Injectable} from "@angular/core";
import {Restaurant} from "../recommender/recommender.model";

@Injectable({
  providedIn: 'root',
})
export class RestaurantFinderService {
  private restaurants = [
    {name: "La Taverna 🍕", lat: 47.38724468335871, lng: 8.48763693465759},
    {name: "La Taqueria 🌮", lat: 47.388651819102, lng: 8.486259418417081},
    {name: "Burgermeister 🍔", lat: 47.388153847815154, lng: 8.486561599618312},
    {name: "Taj Mahal 🍛", lat: 47.38696582766578, lng: 8.489482861762774},
    {name: "Buckhuser 🥓", lat: 47.383815345442, lng: 8.49271102432384},
    {name: "Not Guilty Thai 🍛", lat: 47.38383166183054, lng: 8.494819738915744},
    {name: "Orient 🌯", lat: 47.38268580513137, lng: 8.500264485908378},
    {name: "Musti Grill 🍖", lat: 47.38748036314514, lng: 8.488216945709725},
    {name: "Memo Kebab 🌯", lat: 47.38800059379254, lng: 8.486065403988496},
    {name: "Ruenthai 2 🍛", lat: 47.38537151919522, lng: 8.494775647497779},
    {name: "Antonio 🍕", lat: 47.38765659782448, lng: 8.487319807143995},
    {name: "Burger Brothers 🍕", lat: 47.38786026207553, lng: 8.486848117088368}
  ]

  constructor() {
  }

  public findRestaurant(): Restaurant {
    let random = Math.floor(Math.random() * this.restaurants.length);
    return this.restaurants[random];
  }
}
