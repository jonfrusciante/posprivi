import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PrinterService} from '../printer.service';
import {Observable} from 'rxjs/Rx';
import {AngularFirestore} from "angularfire2/firestore";
import {map} from "rxjs/internal/operators";

@Component({
  selector: 'app-pizzeria',
  templateUrl: './pizzeria.component.html',
  styleUrls: ['./pizzeria.component.css']
})
export class PizzeriaComponent implements OnInit {
  @ViewChild('ticket') div: ElementRef;
  orders$: Observable<any[]>;
  stampanteSel: string;
  rep: string;
  host: string;
  printerAvia: Observable<any[]>;
  installedPrinter: Observable<any[]>;

  constructor(private  prinSer: PrinterService, private afs: AngularFirestore) {
    this.printerAvia = prinSer.printerAviable;
    this.installedPrinter = prinSer.getPrinters();
    this.orders$ = this.afs.collection('Tavoli').doc('3' ).collection('ordini').snapshotChanges().pipe(
      map(actions => actions.map( a => {
        const data = a.payload.doc.data() ;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }

  addStampante() {
    this.prinSer.setConfigPrinter(this.host, this.rep, this.stampanteSel);
  }

  ngOnInit() {
  }

  modificarow() {

  }

  printP() {
    const data = this.div.nativeElement.innerHTML;
    this.prinSer.printFinal(data);
  }
}
