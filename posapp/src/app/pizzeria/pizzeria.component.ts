import { Component, OnInit } from '@angular/core';
import {PrinterService} from "../printer.service";

@Component({
  selector: 'app-pizzeria',
  templateUrl: './pizzeria.component.html',
  styleUrls: ['./pizzeria.component.css']
})
export class PizzeriaComponent implements OnInit {
printerAvia:any;
  constructor(public  prinSer: PrinterService) {
    this.printerAvia = prinSer.printerAviable;
    console.log(this.printerAvia);
    prinSer.getPrinters().subscribe(n => console.log( n));
  }

  ngOnInit() {
  }

}
