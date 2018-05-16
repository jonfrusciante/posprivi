import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
import {Observable} from "rxjs/index";
export  interface Prodotti {
  nome:string;
  categoria:string;
  prezzo:number;
}
export interface Categorie{
  nome:string;
  visibilita:boolean;
}
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  Categorie$:Observable<Categorie[]>;
  ProdottiCollectionRef:AngularFirestoreCollection<Prodotti>;
  CategCollRef:AngularFirestoreCollection<Categorie>;
  Prodotti$:Observable<Prodotti[]>;
  Prodotto:any;
  constructor(private afs: AngularFirestore) {
  this.ProdottiCollectionRef =this.afs.collection( 'Prodotti');
  this.CategCollRef=this.afs.collection('Categorie_prodotti');
  }
  addPrdotti(regForm:NgForm){

  }
  registerUser(regForm:NgForm) {
    this.Prodotto={};
    this.Prodotto.nome=regForm.value.nameitems;
    this.Prodotto.categoria=regForm.value.Categoria;
    this.Prodotto.prezzo=regForm.value.prezzo;
    console.log(this.Prodotto);

    this.ProdottiCollectionRef.add(this.Prodotto)
  }
  ngOnInit() {
    this.Categorie$=this.CategCollRef.valueChanges();
  }

}
