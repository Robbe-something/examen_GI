import {Component} from '@angular/core';
import {NotificationService} from "../notification.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {
  private allNotifications: any;
  notifications: any;

  constructor(private service: NotificationService) {
  }

  ngOnInit() {
    this.allNotifications = this.service.getNotifications();
    this.notifications = this.allNotifications.slice(0, 5);
  }


  loadMore() {
    this.notifications = this.allNotifications.slice(0, this.notifications.length + 5);
  }
}
