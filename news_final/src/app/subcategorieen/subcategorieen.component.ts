import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NieuwsService} from "../data/nieuws.service";

@Component({
  selector: 'app-subcategorieen',
  templateUrl: './subcategorieen.component.html',
  styleUrls: ['./subcategorieen.component.css']
})
export class SubcategorieenComponent implements OnInit {

  subcategorieen:string[] = [];

  @Input()
  onderwerpId:string="";

  @Output()
  subCategorieGekozen = new EventEmitter<string>();

  constructor(private service: NieuwsService) { }

  ngOnInit(): void {
    this.service.haalSubCategorien(this.onderwerpId).subscribe((subCategorieen:string[])=>{
      this.subcategorieen = subCategorieen;
    });
  }

  // als je hier 'event: Event' schrijft, kan je niet verder
  // bij event.target... -> foutmelding 'Object is possibly null'
  klik(event: any): void{
    this.subCategorieGekozen.emit(event.target.innerText);
  }

}
