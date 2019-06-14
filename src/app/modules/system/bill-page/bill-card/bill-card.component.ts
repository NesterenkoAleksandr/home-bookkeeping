import { Component, OnInit, Input } from '@angular/core';
import { Bill } from '../../shared/models/bill.model';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bill: Bill;
  @Input() currency: any;

  dollar: number;
  rub: number;
  eur: number;

  constructor() { }

  ngOnInit() {
    this.dollar = this.bill.value / this.getCurrency('USD').rate;
    this.rub = this.bill.value / this.getCurrency('RUB').rate;
    this.eur = this.bill.value / this.getCurrency('EUR').rate;
  }

  private getCurrency(name: string): any {
    return this.currency.find((item: any) => item.cc === name.toUpperCase());
  }

}
