import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {AngularFirestore} from 'angularfire2/firestore';
import {map} from 'rxjs/internal/operators';
import {Prodotti} from '../forms/forms.component';

@Component({
  selector: 'app-tichet-order',
  templateUrl: './tichet-order.component.html',
  styleUrls: ['./tichet-order.component.css']
})
export class TichetOrderComponent implements OnInit {
  $orders: Observable<any[]>;
  $tables: Observable<any[]>;
  constructor(private afs: AngularFirestore) {
    this.$tables = this.afs.collection('Tavoli').valueChanges();
  }

  ngOnInit() {
  }

  showorder(numero: String | any) {
   this.$orders = this.afs.collection('Tavoli').doc(numero).collection('ordini').snapshotChanges().pipe(
     map(actions => actions.map( a => {
       const data = a.payload.doc.data() ;
       const id = a.payload.doc.id;
       return {id, ...data};
     }))
   );

  }

  completa(order) {
    this.afs.collection('Tavoli').doc(order.nTavolo).update({islibero: true});
    this.afs.collection('Tavoli').doc(order.nTavolo).collection('ordini').doc(order.id).delete();

}
}
