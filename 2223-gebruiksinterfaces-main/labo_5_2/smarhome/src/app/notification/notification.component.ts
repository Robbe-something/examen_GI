import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @Input() message: string = "Dit is het bericht";
  @Input() icon: string = "fa-key";
  @Input() date: Date = new Date();

}
