import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any, value: string, field: string = 'amount'): any {
    if (!items || !value) {
      return items;
    }

    return items.filter((item) => {
      const tmp = Object.assign({}, item);

      if (!isNaN(tmp[field])) {
        tmp[field] += '';
      }

      if (field === 'type') {
        tmp[field] = tmp[field] === 'income' ? 'доход' : 'расход';
      }

      if (field === 'category') {
        tmp[field] = tmp.categoryName;
      }

      return tmp[field].toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }

}
