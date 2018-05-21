import { Component, OnInit } from '@angular/core';
import {PrinterService} from '../printer.service';
import {Observable} from "rxjs/Rx";

@Component({
  selector: 'app-pizzeria',
  templateUrl: './pizzeria.component.html',
  styleUrls: ['./pizzeria.component.css']
})
export class PizzeriaComponent implements OnInit {
  rep: string ; host: string;
 printerAvia: Observable<any[]>;
  constructor(public  prinSer: PrinterService) {
    this.printerAvia = prinSer.printerAviable;
    prinSer.getPrinters().subscribe(n => console.log( n));
  }
  addStampante() {
    this.prinSer.setConfigPrinter(this.host, this.rep);
  }
  ngOnInit() {
  }

}
