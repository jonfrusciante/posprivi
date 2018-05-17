import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "angularfire2/firestore";
import {map} from "rxjs/internal/operators";
import {Prodotti} from "../forms/forms.component";
import {Observable} from "rxjs/Rx";

@Component({
  selector: 'app-prodotti',
  templateUrl: './prodotti.component.html',
  styleUrls: ['./prodotti.component.css']
})
export class ProdottiComponent implements OnInit {
  ngOnInit(){}

  constructor(private db:AngularFirestore){
    this.items = db.collection('/Prodotti').snapshotChanges().pipe(
      map(actions => actions.map( a =>
      {
        const data = a.payload.doc.data() as Prodotti;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );

  }
  eliminaprodotto(item){
    this.db.collection('Prodotti').doc(item.id).delete();
    console.log(item.id)
  }
  modificaprodotto(item){
    this.hiddent = !this.hiddent;
    console.log(this.hiddent);
    // this.db.collection('Prodotti').doc(item.id).set(item);
  }
  conferma(item){
    item.prezzo = this.prezzo;
    console.log(item);
    this.db.collection('Prodotti').doc(item.id).set(item);
    this.hiddent = !this.hiddent;


  }
  public hiddent = false;
  public items: Observable<any[]>;
  prezzo:any;

}
