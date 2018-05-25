import { Injectable } from '@angular/core';
import {FirestoreService} from "./firestore.service";
import {PrinterService} from "./printer.service";
import {Observable} from "rxjs/Rx";
import {TicketOrder} from "./pizzeria/pizzeria.component";
import {map} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class TicketServiceService {
  ordersi$: Observable<TicketOrder[]>;
  constructor(private db: FirestoreService, private print: PrinterService) {

  }
  dispatchTicket(table) {
    this.ordersi$ = this.db.col$(`Tavoli/${table}/ordini`);
    return this.ordersi$.pipe(
      map( x => x.map(
        ord => {
          const pizzeriaOrder = ord.ordine.filter(articoli => articoli.printer === 'PizzeriaPrinter');
          const CucinaOrder = ord.ordine.filter(articoli => articoli.printer === 'CucinaPrinter');
         // ord.ordine = ord.ordine.filter(articoli => articoli.printer === 'PizzeriaPrinter');
          if (pizzeriaOrder.length > 0) {
            console.log('pizzeria if');
            ord.ordine = pizzeriaOrder;
            this.db.add('OrdiniPizzeria' , ord );
          } else if (CucinaOrder.length > 0){
            console.log('cocina if');

            ord.ordine = CucinaOrder;
            this.db.add('OrdiniCucina' , ord );

          }
          // const ordi = ord.ordine.filter(articoli => articoli.printer === 'PizzeriaPrinter');
          // const data = ord.data_modifica;
          return ord ;
        }
      ) )
    );

  }
}
