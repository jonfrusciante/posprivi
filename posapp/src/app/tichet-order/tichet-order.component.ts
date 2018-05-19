import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Rx";
import {AngularFirestore} from "angularfire2/firestore";

@Component({
  selector: 'app-tichet-order',
  templateUrl: './tichet-order.component.html',
  styleUrls: ['./tichet-order.component.css']
})
export class TichetOrderComponent implements OnInit {
  $tables:Observable<any[]>;
  constructor(private afs:AngularFirestore) {
    this.$tables=this.afs.collection('Tavoli').valueChanges();
  }

  ngOnInit() {
  }

}
