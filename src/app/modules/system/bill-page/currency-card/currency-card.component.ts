import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {
  // @Input() bill: Bill;
  @Input() currency: any;

  currencies: string[] = ['USD', 'RUB', 'UAH'];

  constructor() { }

  ngOnInit() {
  }

}
