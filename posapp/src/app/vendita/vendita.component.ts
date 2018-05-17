import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Rx";
import {AngularFirestore} from "angularfire2/firestore";

@Component({
  selector: 'app-vendita',
  templateUrl: './vendita.component.html',
  styleUrls: ['./vendita.component.css']
})
export class VenditaComponent implements OnInit {
  categories:Observable<any[]>;
  order:Object={};
  prodotti:Observable<any[]>;
  constructor(private  afs:AngularFirestore) {
    this.categories = this.afs.collection('Categorie_prodotti').valueChanges();
    this.prodotti=this.afs.collection('Prodotti').valueChanges();
  }

  ngOnInit() {
  }

}
