import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Rx";
import {AngularFirestore} from "angularfire2/firestore";
import {Prodotti} from "../forms/forms.component";
import {map} from "rxjs/internal/operators";

@Component({
  selector: 'app-vendita',
  templateUrl: './vendita.component.html',
  styleUrls: ['./vendita.component.css']
})
export class VenditaComponent implements OnInit {
  categories:Observable<any[]>;
  order=[];
  Prodotto$:Observable<any>;
  Product:Observable<any[]>;
  constructor(private  afs:AngularFirestore) {
    this.categories = this.afs.collection('Categorie_prodotti').valueChanges();
    this.Product=this.afs.collection('Prodotti').snapshotChanges().pipe(
      map(actions => actions.map( a =>
      {
        const data = a.payload.doc.data() as Prodotti;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }
  addproduct(productId){
    this.afs.collection('Prodotti').doc(productId).valueChanges().subscribe(s => this.order.push(s));

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
}
