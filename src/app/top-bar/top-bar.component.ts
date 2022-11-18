import {Component} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {InfoModalComponent} from "../info-modal/info-modal.component";
import {SettingsModalComponent} from "../settings-modal/settings-modal.component";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {

  constructor(private modalService: NgbModal) {}

  refresh() {
    window.location.reload();
  }

  openAboutDialog() {
    this.modalService.open(InfoModalComponent)
  }

  openSettingsDialog() {
    this.modalService.open(SettingsModalComponent)
  }
}
