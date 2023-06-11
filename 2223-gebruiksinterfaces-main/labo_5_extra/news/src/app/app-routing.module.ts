import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OverzichtComponent} from "./overzicht/overzicht.component";
import {KeuzeschermComponent} from "./keuzescherm/keuzescherm.component";
import {DetailsComponent} from "./details/details.component";

const routes: Routes = [
  { path: '', component: OverzichtComponent},
  { path: 'keuze/:id', component: KeuzeschermComponent},
  { path: 'details/:id', component: DetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
