import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PrinterService} from '../printer.service';
import {Observable} from 'rxjs/Rx';
import {AngularFirestore} from 'angularfire2/firestore';
import {map} from 'rxjs/internal/operators';
import {FirestoreService} from "../firestore.service";
import {TicketServiceService} from "../ticket-service.service";
export interface Ordine {
  categoria: string;
  nome: string;
  prezzo: number;
  id?: string;
  printer: string;
}
export interface TicketOrder {
  data_modifica: Date;
  id?: string;
  ordine: Ordine[];
  status: string;

}

@Component({
  selector: 'app-pizzeria',
  templateUrl: './pizzeria.component.html',
  styleUrls: ['./pizzeria.component.css']
})

export class PizzeriaComponent implements OnInit {
  @ViewChild('ticket') div: ElementRef;
  ordersi$: Observable<TicketOrder[]>;
  orderFROM$: Observable<Ordine[]>;
  $OrderPizza: Observable<TicketOrder[]>;
  stampanteSel: string;
  rep: string;
  host: string;
  printerAvia: Observable<any[]>;
  installedPrinter: Observable<any[]>;
  order: TicketOrder[];
   table = 1;
  constructor(private  prinSer: PrinterService, private afs: AngularFirestore, private db: FirestoreService ) {
    this.$OrderPizza = this.db.col$('OrdiniPizzeria');
    this.$OrderPizza.subscribe(c=>console.log(c));
    this.printerAvia = prinSer.printerAviable;
    this.installedPrinter = prinSer.getPrinters();
    this.ordersi$ = this.db.col$(`Tavoli/${this.table}/ordini`);
    this.ordersi$.subscribe(c => console.log(c));
    this.orderFROM$ = this.filterOrderPizzeria();
    this.orderFROM$.subscribe(kk => console.log(kk));
    // this.orders$.subscribe(n => this.order = n);
  }

  addStampante() {
    this.prinSer.setConfigPrinter(this.host, this.rep, this.stampanteSel);
  }

  ngOnInit() {
  }

  filterOrderPizzeria(): Observable<any[]> {
    this.ordersi$ = this.db.col$(`Tavoli/${this.table}/ordini`);
    return this.ordersi$.pipe(
      map( x => x.map(
        ord => {
          ord.ordine = ord.ordine.filter(articoli => articoli.printer === 'PizzeriaPrinter');
          // const ordi = ord.ordine.filter(articoli => articoli.printer === 'PizzeriaPrinter');
          // const data = ord.data_modifica;
           return ord ;
        }
      ) )
    );
  }

  printP(order) {
    const ordine:any[] = order.ordine;
    const prod = ordine.map(k =>  ` <tr><td>${ k.nome }</td>  <td>${k.prezzo}</td></tr> ` )   ;
    //const prezz = order.map(n => n.ordine.map( k => ` <td>${ k.prezzo }</td> ` ) ) ;
    console.log(ordine);
    const data =
      `
<!DOCTYPE HTML>
<html>
<head>
<title>Title of the document</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css">
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
</head>

<body>
<div class="container">
  <h2>Ticket</h2>
  <p>Modifica at : </p>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Nome Prodotto</th>
        <th>Prezzo</th>
        <th>Quantita</th>
      </tr>
    </thead>
    <tbody>
        ${prod}
              </tr>
    </tbody>
  </table>
</div>
</body>

</html>`;
    // const data = this.div.nativeElement.innerHTML;
    console.log(data);

    this.prinSer.printFinal(data);
  }
}
