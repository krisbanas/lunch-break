import {Component} from '@angular/core';
import packageJson from '../../../package.json';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
})
export class InfoModalComponent {
  version: string = packageJson.version;
}
