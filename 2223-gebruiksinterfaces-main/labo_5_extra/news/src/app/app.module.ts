import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeuzeschermComponent } from './keuzescherm/keuzescherm.component';
import { OpsommingComponent } from './opsomming/opsomming.component';
import { OverzichtComponent } from './overzicht/overzicht.component';
import { SubcategorieenComponent } from './subcategorieen/subcategorieen.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    KeuzeschermComponent,
    OpsommingComponent,
    OverzichtComponent,
    SubcategorieenComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
