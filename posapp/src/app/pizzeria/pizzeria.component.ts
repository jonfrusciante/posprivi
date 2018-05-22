import { Component, OnInit } from '@angular/core';
import {PrinterService} from '../printer.service';
import {Observable} from 'rxjs/Rx';
import {map} from "rxjs/internal/operators";

@Component({
  selector: 'app-pizzeria',
  templateUrl: './pizzeria.component.html',
  styleUrls: ['./pizzeria.component.css']
})
export class PizzeriaComponent implements OnInit {
  stampanteSel:string;
  rep: string ; host: string;
  printerAvia: Observable<any[]>;
  installedPrinter: Observable<any[]>;
  constructor (public  prinSer: PrinterService) {
    this.printerAvia = prinSer.printerAviable;
    this.installedPrinter = prinSer.getPrinters() ;
  }
  addStampante() {
    this.prinSer.setConfigPrinter(this.host, this.rep, this.stampanteSel);
  }
  ngOnInit() {
  }

  modificarow() {

  }

  printP() {
    const data = [
      'Raw Data\n',
      'More Raw Data\n',
      'Even More Raw Data\n'
    ];
  this.prinSer.schegli('pizzeria').pipe( map ( n => this.prinSer.printData(n.printer, data).subscribe())) ; //  this.prinSer.printData()
  }
}
