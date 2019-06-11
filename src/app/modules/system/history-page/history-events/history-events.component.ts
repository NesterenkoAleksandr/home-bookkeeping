import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { AppEvent } from '../../shared/models/event.model';

@Component({
  selector: 'app-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Input() events: AppEvent[] = [];
  searchValue = '';
  searchPlaceholder = 'Сумма...';
  searchField = 'amount';

  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    this.events.forEach((event: AppEvent) => event.categoryName = this.categories.find((category: Category) => category.id === event.category).name);
  }

  changeCriteria(field: string) {
    const namesMap = {
      amount: 'Сумма...',
      date: 'Дата...',
      category: 'Категория...',
      type: 'Тип операции...'
    };

    this.searchPlaceholder = namesMap[field];
    this.searchField = field;
  }

}
