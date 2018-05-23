import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
import {Observable} from "rxjs/index";
export  interface Prodotti {
  id?:string;
  nome:string;
  categoria:string;
  prezzo:number;
  printer?:string;
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
  selectedPrinter: any;

  optionPrint = [];
  printercucina = {nome: ''};
  printerpizzeria={nome: ''};
  selectedCat:any;
  Categorie$:Observable<Categorie[]>;
  ProdottiCollectionRef:AngularFirestoreCollection<Prodotti>;
  CategCollRef:AngularFirestoreCollection<Categorie>;
  Prodotti$:Observable<Prodotti[]>;
  Prodotto:any;
  constructor(private afs: AngularFirestore) {
  this.ProdottiCollectionRef =this.afs.collection( 'Prodotti');
  this.CategCollRef=this.afs.collection('Categorie_prodotti');
  this.printerpizzeria.nome = 'PizzeriaPrinter';
  this.printercucina.nome = 'CucinaPrinter';

    this.optionPrint.push(this.printercucina);
    this.optionPrint.push(this.printerpizzeria);


  }
  AddCategoria(regForm:NgForm){
    let cat:any={};
    cat.nome = regForm.value.addcategoria;
    cat.visibilibita = true;
    console.log(cat);
    this.CategCollRef.add(cat);
  }
  registerUser(regForm:NgForm) {
    this.Prodotto={};
    this.Prodotto.nome=regForm.value.nameitems;
    this.Prodotto.categoria=this.selectedCat;
    this.Prodotto.prezzo=regForm.value.prezzo;
    this.Prodotto.printer=this.selectedPrinter;
    this.Prodotto.quantity=1;
    console.log(this.Prodotto);
    this.ProdottiCollectionRef.add(this.Prodotto);
    this.Prodotto={};

  }
  ngOnInit() {
    this.Categorie$=this.CategCollRef.valueChanges();
  }

}
