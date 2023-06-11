import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input() boodschap: string | undefined;
  @Input() icoon: string | undefined;
  tijdsaanduiding: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
