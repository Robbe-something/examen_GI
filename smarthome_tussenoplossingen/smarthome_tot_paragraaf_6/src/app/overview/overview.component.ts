import { Component, OnInit } from '@angular/core';

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
  //+/
  //+/ Een eerste online aanknopingspunt
  //+/ (al staat hier een nog specifieker probleem):
  //+/   https://stackoverflow.com/questions/42091602/type-is-not-assignable-to-type-title-string-text-string
  notificationsVisible : {id:number, message:string,icon:string}[] = [];


  notifications : {id:number, message:string,icon:string}[] = [{
    "id": 0,
    "message": "Wake up alarm in master bedroom!",
    "icon": "fa-clock"
  },
    {
      "id": 1,
      "message": "Back door locked",
      "icon": "fa-lock"
    },
    {
      "id": 2,
      "message": "Bathroom humidity reaches threshold",
      "icon": "fa-bath"
    },
    {
      "id": 3,
      "message": "Sam unlocked front door",
      "icon": "fa-key"
    },
    {
      "id": 4,
      "message": "Cloud backup completed",
      "icon": "fa-upload"
    },
    {
      "id": 5,
      "message": "Wake up alarm in master bedroom",
      "icon": "fa-clock"
    },
    {
      "id": 6,
      "message": "Back door locked",
      "icon": "fa-lock"
    },
    {
      "id": 7,
      "message": "Bathroom humidity reaches threshold",
      "icon": "fa-bath"
    },
    {
      "id": 8,
      "message": "Sam unlocked front door",
      "icon": "fa-key"
    },
    {
      "id": 9,
      "message": "Cloud backup completed",
      "icon": "fa-upload"
    },
    {
      "id": 10,
      "message": "Wake up alarm in master bedroom",
      "icon": "fa-clock"
    },
    {
      "id": 11,
      "message": "Back door locked",
      "icon": "fa-lock"
    },
    {
      "id": 12,
      "message": "Bathroom humidity reaches threshold",
      "icon": "fa-bath"
    },
    {
      "id": 13,
      "message": "Sam unlocked front door",
      "icon": "fa-key"
    },
    {
      "id": 14,
      "message": "Cloud backup completed",
      "icon": "fa-upload"
    },
    {
      "id": 15,
      "message": "Wake up alarm in master bedroom",
      "icon": "fa-clock"
    },
    {
      "id": 16,
      "message": "Back door locked",
      "icon": "fa-lock"
    },
    {
      "id": 17,
      "message": "Bathroom humidity reaches threshold",
      "icon": "fa-bath"
    },
    {
      "id": 18,
      "message": "Sam unlocked front door",
      "icon": "fa-key"
    },
    {
      "id": 19,
      "message": "Cloud backup completed",
      "icon": "fa-upload"
    }
  ];
  constructor() { }

  ngOnInit(): void {
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
