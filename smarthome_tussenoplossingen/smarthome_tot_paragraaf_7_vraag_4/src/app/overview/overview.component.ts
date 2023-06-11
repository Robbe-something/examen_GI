import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../notification.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  numberOfNotificationsVisible:number = 5;

  //+/ Voor wie in 'strict mode' werkt (waarbij er strenger wordt toegekeken
  //+/ op de types die gebruikt worden):
  //+/ geef het juiste type aan voor de (lege) list die je klaarzet
  //+/ anders krijg je de foutmelding
  //+/        Type '{ id: number; message: string; icon: string; }[]'
  //+/        is not assignable to type 'never[]'.
  //+/  [TENZIJ JE NIET IN 'strict'-MODUS WERKT]
  //+/ Een eerste online aanknopingspunt
  //+/ (al staat hier een nog specifieker probleem):
  //+/   https://stackoverflow.com/questions/42091602/type-is-not-assignable-to-type-title-string-text-string
  notificationsVisible : {id:number, message:string,icon:string}[]  = [];
  notifications: {id:number, message:string,icon:string}[]  = [];

  //+/ nieuw voor paragraaf 7 (Service): service als parameter aan constructor meegeven
  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notifications = this.notificationService.haalNotifications();
    this.adjustVisibleNotifications();
  }

  showMore(){
    this.numberOfNotificationsVisible = Math.min(this.numberOfNotificationsVisible+5, this.notifications.length);
    this.adjustVisibleNotifications();

    if(this.numberOfNotificationsVisible === this.notifications.length){
      let domElt = document.getElementById("id_load_more");
      // @ts-ignore
      domElt.style.display = "none";
    }
  }

  adjustVisibleNotifications(){
    this.notificationsVisible = this.notifications.slice(0,this.numberOfNotificationsVisible);
  }

}
