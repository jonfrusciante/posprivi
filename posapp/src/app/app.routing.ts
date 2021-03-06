import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProdottiComponent} from "./prodotti/prodotti.component";
import {OrderTicket, VenditaComponent} from "./vendita/vendita.component";
import {TavoliComponent} from "./tavoli/tavoli.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {AddproductComponent} from "./prodotti/addproduct/addproduct.component";
import {TichetOrderComponent} from "./tichet-order/tichet-order.component";
import {PizzeriaComponent} from "./pizzeria/pizzeria.component";
import {CucinaComponent} from "./cucina/cucina.component";

const appRoutes : Routes =
  [
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'prodotti',
      component: ProdottiComponent,
      children: [
        {
          path: 'add',
          component: AddproductComponent
    }]
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
      path: 'order',
      component: TichetOrderComponent,

    },
    {
      path: 'pizzeria',
      component: PizzeriaComponent,

    },
    {
      path: 'cucina',
      component: CucinaComponent,

    },
    {
      path: '**',
      component: PageNotFoundComponent
    }
  ];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

