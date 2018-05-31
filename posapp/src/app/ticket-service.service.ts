import { Injectable } from '@angular/core';
import {FirestoreService} from './firestore.service';
import {PrinterService} from './printer.service';
import {Observable} from 'rxjs/Rx';
import {TicketOrder} from './pizzeria/pizzeria.component';
import {map} from 'rxjs/internal/operators';

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
          console.log('pizza' , pizzeriaOrder  , 'cucina' , CucinaOrder);
          ord.ordine = [];
          ord.ordine = pizzeriaOrder;
          ord.ordine.length > 0 ? this.db.add('OrdiniPizzeria' , ord ) : ord.ordine = [];
          ord.ordine = [];
          ord.ordine = CucinaOrder;
          ord.ordine.length > 0 ? this.db.add('OrdiniCucina' , ord ) : ord.ordine = [];
         /*
          let statusP = false;
          let statusC = false;
         // ord.ordine = ord.ordine.filter(articoli => articoli.printer === 'PizzeriaPrinter');
          if (pizzeriaOrder.length > 0 && statusP === false ) {
            console.log('pizzeria if' , 'and status p = ' , statusP);
            ord.ordine = pizzeriaOrder;
            statusP = true;
            this.db.add('OrdiniPizzeria' , ord );
          }
          if (CucinaOrder.length > 0 && statusC === false) {
            console.log('cocina if' , 'and statusC = ' , statusC);
            ord.ordine = CucinaOrder;
            statusC=true;

            this.db.add('OrdiniCucina' , ord );
          }*/
          // const ordi = ord.ordine.filter(articoli => articoli.printer === 'PizzeriaPrinter');
          // const data = ord.data_modifica;
        //  return ord ;
        }
      ) )
    );

  }
}
