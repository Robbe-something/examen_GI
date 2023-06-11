import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @Input() boodschap!: string
  @Input() logo!: string
  date = new Date()
}
