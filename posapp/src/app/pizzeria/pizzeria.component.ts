import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PrinterService} from '../printer.service';
import {Observable} from 'rxjs/Rx';
import {AngularFirestore} from 'angularfire2/firestore';
import {map} from 'rxjs/internal/operators';
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
  orders$: Observable<TicketOrder[]>;
  stampanteSel: string;
  rep: string;
  host: string;
  printerAvia: Observable<any[]>;
  installedPrinter: Observable<any[]>;
  order: TicketOrder[];

  constructor(private  prinSer: PrinterService, private afs: AngularFirestore) {
    this.printerAvia = prinSer.printerAviable;
    this.installedPrinter = prinSer.getPrinters();
    this.orders$ = this.afs.collection('Tavoli').doc('3' ).collection('ordini').snapshotChanges().pipe(
      map(actions => actions.map( a => {
        const data = a.payload.doc.data() as TicketOrder ;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
    this.orders$.subscribe(n => this.order = n);
  }

  addStampante() {
    this.prinSer.setConfigPrinter(this.host, this.rep, this.stampanteSel);
  }

  ngOnInit() {
  }

  modificarow(prod) {

  return ` `;
  }

  printP() {
    const prod = this.order.map(n => n.ordine.map( k =>  ` <td>${ k.nome }</td> ` ) )  ;
    const prezz = this.order.map(n => n.ordine.map( k => ` <td>${ k.prezzo }</td> ` ) ) ;
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
      <tr>
        ${prod}
        ${ prezz }

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
