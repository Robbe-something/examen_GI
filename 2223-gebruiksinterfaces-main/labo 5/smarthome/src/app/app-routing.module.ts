import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OverviewComponent} from "./overview/overview.component";
import {EnergyComponent} from "./energy/energy.component";
import {TemperatureComponent} from "./temperature/temperature.component";
import {SecurityComponent} from "./security/security.component";

const routes: Routes = [
  {path: 'overview', component: OverviewComponent},
  {path: 'energy', component: EnergyComponent},
  {path: 'temperature', component: TemperatureComponent},
  {path: 'security', component: SecurityComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
