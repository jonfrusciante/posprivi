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

@NgModule({
  declarations: [
    AppComponent,
    FormsComponent,
    ProdottiComponent,
    VenditaComponent,
    TavoliComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
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
