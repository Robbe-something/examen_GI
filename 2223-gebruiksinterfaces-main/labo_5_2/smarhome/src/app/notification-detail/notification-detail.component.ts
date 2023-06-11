import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NotificationService} from "../notification.service";

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.css']
})
export class NotificationDetailComponent {

  notification: any;
  constructor(private route: ActivatedRoute, private service: NotificationService) { }


  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    id??="";
    this.notification = this.service.getNotification(id);

  }
}
