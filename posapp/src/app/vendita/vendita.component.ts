import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Rx";
import {AngularFirestore} from "angularfire2/firestore";
import {Prodotti} from "../forms/forms.component";
import {map} from "rxjs/internal/operators";
import {isUndefined} from "util";
export interface OrderTicket{
  id?:string;
  nTavolo:string;
  NCoperti:number;
  ordine:Object;
}
@Component({
  selector: 'app-vendita',
  templateUrl: './vendita.component.html',
  styleUrls: ['./vendita.component.css']
})
export class VenditaComponent implements OnInit {
  nCoperti:number;
  selectedtableId:any;
  public now: Date = new Date();
  Table$:Observable<any[]>;
  categories:Observable<any[]>;
  order=[];
  Prodotto$:Observable<any>;
  Product:Observable<any[]>;
  constructor(private  afs:AngularFirestore) {
    this.Table$=this.afs.collection('Tavoli').valueChanges();
    this.categories = this.afs.collection('Categorie_prodotti').valueChanges();
    this.Product=this.afs.collection('Prodotti').snapshotChanges().pipe(
      map(actions => actions.map( a =>
      {
        const data = a.payload.doc.data() as Prodotti;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
    setInterval(() => {
      this.now = new Date();
    }, 1)
  }
  addproduct(productId){
    this.afs.collection('Prodotti').doc<Prodotti>(productId).valueChanges().subscribe(s => {
      s.id=productId;
      this.order.push(s);
    });

    console.log(this.order);

  }
  ngOnInit() {
  }

  getSum() {
    let i = 0 ,
      sum = 0;
    for(; i < this.order.length; i++) {
      sum += parseInt(this.order[i].prezzo , 10);
    }
    return sum;

  }

  deleteItem(i) {
    this.order.splice(i,1);
  }

  clearOrder() {
    this.order=[];
  }

  checkout(order) {
    let c={
      ordine : order ,
      nTavolo : this.selectedtableId,
      status:'open',
      data_modifica:this.now

    };
    this.afs.collection('OrderTicket').add(c);
    this.afs.collection('Tavoli').doc(c.nTavolo).update({islibero:false});
    console.log(c);

    this.selectedtableId=undefined;
    this.order=[];
  }
}
