import {Component, OnInit} from '@angular/core';
import {Options} from '@angular-slider/ngx-slider';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Store} from "@ngxs/store";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SearchSettings} from "../recommender/recommender.model";
import {SetSearchSettings} from "../recommender/recommender.actions";

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss']
})
export class SettingsModalComponent implements OnInit {

  constructor(private store: Store, protected fb: FormBuilder, private modalService: NgbModal) {}

  ngOnInit(): void {
    let settings = this.store.snapshot().recommender_model.searchSettings

    this.settingsForm = this.fb.group({
      distanceSlider: [settings.distance],
      starSlider: [settings.minStars],
      dollarSlider: new FormControl([settings.minDollar, settings.maxDollar])
    });
  }

  settingsForm: FormGroup

  distanceOptions: Options = {
    floor: 200,
    ceil: 1000,
    step: 50,
    getPointerColor: (_): string => 'darkred',
    getTickColor: (_): string => 'darkred'
  };

  starOptions: Options = {
    floor: 1,
    ceil: 5,
    step: 0.1,
    getPointerColor: (_): string => 'darkred'
  };

  dollarOptions: Options = {
    floor: 1,
    ceil: 4,
    step: 1,
    getPointerColor: (_): string => 'darkred',
    getSelectionBarColor: (_): string => 'darkred',
  };

  onSubmit(buttonAction: string) {
    if (buttonAction == 'submit') {
      const settings: SearchSettings = {
        distance: this.settingsForm.value.distanceSlider,
        minStars: this.settingsForm.value.starSlider,
        minDollar: this.settingsForm.value.dollarSlider[0],
        maxDollar: this.settingsForm.value.dollarSlider[1],
      };
      this.store.dispatch(new SetSearchSettings(settings))
    }

    this.modalService.dismissAll()
  }
}
