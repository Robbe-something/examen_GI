import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-opsomming',
  templateUrl: './opsomming.component.html',
  styleUrls: ['./opsomming.component.css']
})
export class OpsommingComponent {
  @Input() subcategorie: string | null  ="";
}
