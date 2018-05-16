import { Component } from '@angular/core';
import {Observable} from "rxjs/index";
import { AngularFirestore } from 'angularfire2/firestore';
import {map} from "rxjs/internal/operators";
import {Prodotti} from "./forms/forms.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
    this.db.collection('Prodotti').doc(item).delete();
    console.log(item.id)
  }
  public items: Observable<any[]>;
  title = 'app';
}
