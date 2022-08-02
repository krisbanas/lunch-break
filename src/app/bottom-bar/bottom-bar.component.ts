import {Component} from '@angular/core';
import packageInformation from '../../../package.json';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.css']
})
export class BottomBarComponent {
  version = packageInformation.version;
}
