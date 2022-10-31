import {Component} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {InfoModalComponent} from "../info-modal/info-modal.component";

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

  openDialog() {
    this.modalService.open(InfoModalComponent)
  }
}
