import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NieuwsService} from "../data/nieuws.service";

@Component({
  selector: 'app-subcategorieen',
  templateUrl: './subcategorieen.component.html',
  styleUrls: ['./subcategorieen.component.css']
})
export class SubcategorieenComponent {

  constructor(private service: NieuwsService) {
  }

  subcategorieen: string[] = [];
  @Input() catId: string | null = "";
  @Output() subcategorieSelected = new EventEmitter<string>();

  selectSubcategorie(subcategorie: string) {
    this.subcategorieSelected.emit(subcategorie);
  }

  ngOnInit() {
    this.service.haalSubCategorien(this.catId || "0").subscribe(el => this.subcategorieen = el)
  }
}
