import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProdottiComponent} from "./prodotti/prodotti.component";
import {VenditaComponent} from "./vendita/vendita.component";
import {TavoliComponent} from "./tavoli/tavoli.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const appRoutes : Routes =
  [
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'prodotti',
      component: ProdottiComponent
    },
    {
      path: 'vendita',
      component: VenditaComponent,
    },
    {
      path: 'tavoli',
      component: TavoliComponent,

    },
    {
      path: '**',
      component: PageNotFoundComponent
    }
  ];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

