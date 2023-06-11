import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotificationComponent } from './notification/notification.component';
import { OverviewComponent } from './overview/overview.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { EnergyComponent } from './energy/energy.component';
import { SecurityComponent } from './security/security.component';
import { TemperatureGaugeComponent } from './temperature-gauge/temperature-gauge.component';

@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent,
    OverviewComponent,
    TemperatureComponent,
    EnergyComponent,
    SecurityComponent,
    TemperatureGaugeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
