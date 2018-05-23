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

  modificarow() {

  }

  printP() {
    console.log(this.order.map(n => n.ordine ));
   // const data = this.div.nativeElement.innerHTML;
     // this.prinSer.printFinal(data);
  }
}
