import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore} from 'angularfire2/firestore';
import {Prodotti} from '../forms/forms.component';
import {map} from 'rxjs/internal/operators';
import {ActivatedRoute, Router} from '@angular/router';
export interface OrderTicket {
  id?: string;
  nTavolo: string;
  NCoperti: number;
  ordine: Object;
}
@Component({
  selector: 'app-vendita',
  templateUrl: './vendita.component.html',
  styleUrls: ['./vendita.component.css']
})
 export class VenditaComponent implements OnInit , OnDestroy {
  nCoperti: number;
  selectedtableId: any;
  public now: Date = new Date();
  Table$: Observable<any[]>;
  categories: Observable<any[]>;
  order = [];
  Prodotto$: Observable<any>;
  Product: Observable<any[]>;
  private sub: any;
  quantity = 1;
  constructor(private  afs: AngularFirestore , private route: ActivatedRoute,
              private router: Router) {
    this.Table$ = this.afs.collection('Tavoli').valueChanges();
    this.categories = this.afs.collection('Categorie_prodotti').valueChanges();
    this.Product = this.afs.collection('Prodotti').snapshotChanges().pipe(
      map(actions => actions.map( a => {
        const data = a.payload.doc.data() as Prodotti;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
    setInterval(() => {
      this.now = new Date();
    }, 1);
  }
  addproduct(productId) {
    this.afs.collection('Prodotti').doc<Prodotti>(productId).valueChanges().subscribe(s => {
      s.id = productId;
      let flag = 0;
      console.log(this.order);
      for (let i = 0; i < this.order.length; i++) {
        if (s.id === this.order[i].id) {
          flag = 1;
          this.order[i].quantity = this.order[i].quantity + 1;
        }
      }

//Check if flag value changed.
      if (flag === 1) {
        console.log('found');
      } else {
        this.order.push(s);
      }


    });


  }
  sottQ() {
    this.quantity = this.quantity--;
  }
  addQ() {
    this.quantity = this.quantity++;
  }
  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.selectedtableId = params['table'] || undefined;
      });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getSum() {
    let i = 0 ,
      sum = 0;
    for (; i < this.order.length; i++) {
      sum += parseInt(this.order[i].prezzo , 10);
    }
    return sum;

  }

  deleteItem(i) {
    this.order.splice(i, 1);
  }

  clearOrder() {
    this.order = [];
  }

  checkout(order) {
    console.log(order);
    const c = {
      ordine : order ,
      nTavolo : this.selectedtableId,
      status: 'open',
      data_modifica: this.now

    };
    this.afs.collection('Tavoli').doc(c.nTavolo).update({islibero: false});
    this.afs.collection('Tavoli').doc(c.nTavolo).collection('ordini').add(c);
    console.log(c);

    this.selectedtableId = undefined;
    this.order = [];
    this.router.navigate(['./order']);
  }
}
