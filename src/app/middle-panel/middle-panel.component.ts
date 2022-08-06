import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-middle-panel',
  templateUrl: './middle-panel.component.html',
  styleUrls: ['./middle-panel.component.css']
})
export class MiddlePanelComponent implements OnInit {

  isClicked = false;
  recommendation: string | undefined;
  isLoading = false;

  constructor() { }

  ngOnInit(): void {
    this.isLoading = false;
    this.isClicked = false;
  }

  async findRecommendation() {
    this.isLoading = true;
    await new Promise(r => setTimeout(r, 500));
    this.isClicked = true;
    let random = Math.floor(Math.random() * this.restaurants.length);
    this.recommendation = this.restaurants[random].toString();
    this.isLoading = false;
  }

  restaurants = [
    "La Taverna 🍕",
    "La Taqueria 🌮",
    "Burgermeister 🍔",
    "Taj Mahal 🍛",
    "Buckhuser 🥓",
    "Not Guilty Thai 🍛",
    "Orient 🌯",
    "Musti Grill 🍖",
    "Memo Kebab 🌯"
  ]
}
