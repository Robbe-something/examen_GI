import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OverviewComponent} from "./overview/overview.component";
import {TemperatureComponent} from "./temperature/temperature.component";
import {SecurityComponent} from "./security/security.component";
import {EnergyComponent} from "./energy/energy.component";

const routes: Routes = [
  {path:'',component:OverviewComponent},
  {path:"overview",component:OverviewComponent},
  {path:"temperature",component:TemperatureComponent},
  {path:"security",component: SecurityComponent},
  {path:"energy",component:EnergyComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
