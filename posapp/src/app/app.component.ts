import { Component } from '@angular/core';
import {Observable} from "rxjs/index";
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(db:AngularFirestore){
    this.items = db.collection('/Prodotti').valueChanges();

  }
  public items: Observable<any[]>;
  title = 'app';
}
