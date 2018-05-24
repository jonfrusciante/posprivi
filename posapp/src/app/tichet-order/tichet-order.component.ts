import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {AngularFirestore} from 'angularfire2/firestore';
import {map} from 'rxjs/internal/operators';
import {Prodotti} from '../forms/forms.component';
import {PrinterService} from '../printer.service';
import {FirestoreService} from "../firestore.service";


@Component({
  selector: 'app-tichet-order',
  templateUrl: './tichet-order.component.html',
  styleUrls: ['./tichet-order.component.css']
})
export class TichetOrderComponent implements OnInit ,OnDestroy{
  stateB = false;
  @ViewChild('ticket') div: ElementRef;
  $orders: Observable<any[]>;
  $tables: Observable<any[]>;
  constructor(private afs: AngularFirestore , private prinSer: PrinterService, private db: FirestoreService) {
    this.$tables = this.afs.collection('Tavoli').valueChanges();
  }

  ngOnInit()
  {
  }
  ngOnDestroy() {
    // this.prinSer.removePrinter();
}
  showorder(numero: String | any) {
   this.$orders = this.afs.collection('Tavoli').doc(numero).collection('ordini').snapshotChanges().pipe(
     map(actions => actions.map( a => {
       const data = a.payload.doc.data() ;
       const id = a.payload.doc.id;
       return {id, ...data};
     }))
   );
   this.stateB = !this.stateB;
  }
  stampa() {
    const data = `<!DOCTYPE HTML>
<html>
<head>
<title>Title of the document</title>
</head>

<body>
${this.div.nativeElement.innerHTML}
</body>

</html>`;
    console.log(data);
    this.prinSer.printFinal(data) ;


  }

  completa(order) {
   // this.afs.collection('Tavoli').doc(order.nTavolo).update({islibero: true});
    const table = order.nTavolo;
    console.log(`Tavoli/${order.nTavolo}/ordini`);
    this.db.deleteCollection(`Tavoli/${order.nTavolo}/ordini`,20).subscribe(n => this.afs.collection('Tavoli').doc(order.nTavolo).update({islibero: true}));
   // this.afs.collection('Tavoli').doc(order.nTavolo).collection('ordini').doc(order.id).delete()
}
}
