import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-keuzescherm',
  templateUrl: './keuzescherm.component.html',
  styleUrls: ['./keuzescherm.component.css']
})
export class KeuzeschermComponent {
  keuze: string | null ="";
  selectedCategorie: string = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.keuze = this.route.snapshot.paramMap.get('id');
  }

  onSubcategorieChange($event: string) {
    console.log($event)
    this.selectedCategorie = $event;
  }
}
