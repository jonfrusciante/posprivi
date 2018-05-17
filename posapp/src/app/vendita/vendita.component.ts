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
    this.order.push(
    this.afs.collection('Prodotti').doc(productId).valueChanges()
    );
    console.log(this.order);

  }
  ngOnInit() {
  }

  getSum() {


  }
}
