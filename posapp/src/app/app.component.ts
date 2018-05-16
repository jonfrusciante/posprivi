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
  constructor(db:AngularFirestore){
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
    console.log(item)
  }
  public items: Observable<any[]>;
  title = 'app';
}
