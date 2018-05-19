import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Rx";
import {AngularFirestore} from "angularfire2/firestore";

@Component({
  selector: 'app-tichet-order',
  templateUrl: './tichet-order.component.html',
  styleUrls: ['./tichet-order.component.css']
})
export class TichetOrderComponent implements OnInit {
$tickets:Observable<any[]>;
  constructor(private afs:AngularFirestore) {
    this.$tickets=this.afs.collection('Tavoli').valueChanges();
  }

  ngOnInit() {
  }

}
