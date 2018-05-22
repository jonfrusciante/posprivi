import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import * as qz from 'qz-tray';
import {AngularFirestore} from "angularfire2/firestore";
import {map} from "rxjs/internal/operators";


@Injectable({
  providedIn: 'root'
})
export class PrinterService {
  printerAviable:Observable<any[]>;
  selectedhost:string;
  selectedReparto:string;
  constructor(private afs: AngularFirestore) {
    this.printerAviable = this.afs.collection('printer').snapshotChanges().pipe(
      map(actions => actions.map( a => {
        const data = a.payload.doc.data() ;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }
  getSavedConfig() {

  }
  setConfigPrinter(host: string, reparto: string , selectedPrinter: string ) {
    let c = { host: host ,
      printer: selectedPrinter
    };
    this.afs.collection('printer').doc(reparto).set(c);
  }
  errorHandler(error: any): Observable<any> {
    return Observable.throw(error);
  }

// Get list of printers connected
  getPrinters(): Observable<string[]> {
    return Observable
      .fromPromise(qz.websocket.connect().then(() => qz.printers.find()))
      .map((printers: string[]) => printers)
      .catch(this.errorHandler);
  }

// Get the SPECIFIC connected printer
  getPrinter(printerName: string): Observable<string> {
    return Observable
      .fromPromise(qz.websocket.connect().then(() => qz.printers.find(printerName)))
      .map((printer: string) => printer)
      .catch(this.errorHandler);
  }

// Print data to chosen printer
  printData(printer: string, data: any): Observable<any> {
    // Create a default config for the found printer
    const config = qz.configs.create(printer);
    return Observable.fromPromise(qz.print(config, data))
      .map((anything: any) => anything)
      .catch(this.errorHandler);
  }

// Disconnect QZ Tray from the browser
  removePrinter(): void {
    qz.websocket.disconnect();
  }
}
