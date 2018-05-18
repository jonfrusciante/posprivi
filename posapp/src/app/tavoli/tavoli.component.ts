import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Rx";
import {AngularFirestore} from "angularfire2/firestore";
import {map} from "rxjs/internal/operators";
export interface Table{
  id?:string;
  islibero:boolean;
  numero:string;
  coperti:number;
}
@Component({
  selector: 'app-tavoli',
  templateUrl: './tavoli.component.html',
  styleUrls: ['./tavoli.component.css']
})
export class TavoliComponent implements OnInit {
  tables$: Observable<Table[]>;

  constructor(private afs:AngularFirestore) {
    this.tables$=this.afs.collection<Table[]>('Tavoli').snapshotChanges().pipe(
      map (actions => actions.map( a =>
      {
        const data = a.payload.doc.data() as Table;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }

  ngOnInit() {
  }

}
