import { Component, OnInit } from '@angular/core';
import {PrinterService} from "../printer.service";

@Component({
  selector: 'app-pizzeria',
  templateUrl: './pizzeria.component.html',
  styleUrls: ['./pizzeria.component.css']
})
export class PizzeriaComponent implements OnInit {

  constructor(public  prinSer: PrinterService) {
    prinSer.getPrinters().subscribe(n => console.log('test' , n));
  }

  ngOnInit() {
  }

}
