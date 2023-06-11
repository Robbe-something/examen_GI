import { Component } from '@angular/core';
import {NieuwsService} from "../data/nieuws.service";
import {Newsitem} from "../data/newsitem";
import {Onderwerp} from "../data/onderwerp";

@Component({
  selector: 'app-overzicht',
  templateUrl: './overzicht.component.html',
  styleUrls: ['./overzicht.component.css']
})
export class OverzichtComponent {

  constructor(private service: NieuwsService) {
  }
  onderwerpen: Onderwerp[] = [];

  ngOnInit() {
    this.service.haalOnderwerpen().subscribe(el => {
      console.log(el);
      this.onderwerpen = el;
    })
  }
}
