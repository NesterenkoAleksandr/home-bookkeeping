import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent {
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onFilterCancel = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onFilterApply = new EventEmitter();

  @Input() categories: Category[] = [];

  timePeriods = [
    {type: 'd', label: 'За сегодня'},
    {type: 'w', label: 'За неделю'},
    {type: 'M', label: 'За месяц'}
  ];

  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];

  selectedPeriod = 'M';
  selectedTypes = [];
  selectedCategories = [];

  constructor() { }

  closeFilter() {
    this.selectedCategories = [];
    this.selectedTypes = [];
    this.selectedPeriod = 'M';
    this.onFilterCancel.emit();
  }

  applyFilter() {
    this.onFilterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    });
  }

  private calculateInputParams(field: string, checked: boolean, value: string) {
    if (checked) {
      // tslint:disable-next-line:no-unused-expression
      this[field].indexOf(value) !== -1 ? null : this[field].push(value);
    } else {
      this[field] = this[field].filter(item => item !== value);
    }
  }

  handleChangeType({checked, value}) {
    this.calculateInputParams('selectedTypes', checked, value);
  }

  handleChangeCategory({checked, value}) {
    this.calculateInputParams('selectedCategories', checked, value);
  }

}
