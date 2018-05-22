import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';

import {FormsModule} from '@angular/forms';
import { FormsComponent } from './forms/forms.component'
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../environments/environment';
import { ProdottiComponent } from './prodotti/prodotti.component';
import { VenditaComponent } from './vendita/vendita.component';
import { TavoliComponent } from './tavoli/tavoli.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {routing} from "./app.routing";
import {HomeComponent} from "./home/home.component";
import { AddproductComponent } from './prodotti/addproduct/addproduct.component';
import { TichetOrderComponent } from './tichet-order/tichet-order.component';
import { CucinaComponent } from './cucina/cucina.component';
import { PizzeriaComponent } from './pizzeria/pizzeria.component';
import {MagazinoComponent} from "./magazino/magazino.component";

@NgModule({
  declarations: [
    AppComponent,
    FormsComponent,
    HomeComponent,
    ProdottiComponent,
    VenditaComponent,
    TavoliComponent,
    PageNotFoundComponent,
    AddproductComponent,
    TichetOrderComponent,
    CucinaComponent,
    PizzeriaComponent,
    MagazinoComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    NgSelectModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    UiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
