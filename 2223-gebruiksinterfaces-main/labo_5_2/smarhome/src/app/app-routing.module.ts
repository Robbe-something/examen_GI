import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OverviewComponent} from "./overview/overview.component";
import {EnergyComponent} from "./energy/energy.component";
import {TemperatureComponent} from "./temperature/temperature.component";
import {SecurityComponent} from "./security/security.component";
import {NotificationComponent} from "./notification/notification.component";
import {NotificationDetailComponent} from "./notification-detail/notification-detail.component";

const routes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent },
  { path: 'energy', component: EnergyComponent },
  { path: 'temperature', component: TemperatureComponent },
  { path: 'security', component: SecurityComponent },
  { path: 'notification/:id', component: NotificationDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
