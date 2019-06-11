import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { NgForm } from '@angular/forms';
import { AppEvent } from '../../shared/models/event.model';
import * as moment from 'moment';
import { EventsService } from '../../shared/services/events.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';
import { mergeMap } from 'rxjs/operators';
import { Message } from 'src/app/modules/shared/models/message.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {
  @Input() categories: Category[];

  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];

  message: Message;

  sub1: Subscription;
  sub2: Subscription;

  constructor(
    private eventsService: EventsService,
    private billService: BillService) { }

  ngOnInit() {
    this.message = new Message('danger', '');
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

  private showMessage(text: string) {
    this.message.text = text;
    window.setTimeout(() => this.message.text = '', 5000);
  }

  onSubmit(form: NgForm) {
    // tslint:disable-next-line:prefer-const
    let { amount, description, category, type } = form.value;

    if (amount < 0) {
      amount *= -1;
    }

    const date = moment().format('DD.MM.YYYY HH:mm:ss');

    const event = new AppEvent(type, amount, +category, date, description);

    this.sub1 = this.billService.getBill().subscribe(
    (bill: Bill) => {
      let value = 0;

      if (type === 'outcome') {
        if (amount > bill.value) {
          this.showMessage(`На счету не достаточно средств. Вам не хватает ${amount - bill.value} ${bill.currency}.`);
          return;
        } else {
          value = bill.value - amount;
        }
      } else {
        value = bill.value + amount;
      }
      this.sub2 = this.billService.updateBill({value, currency: bill.currency}).pipe(
        mergeMap(() => this.eventsService.addEvent(event))).subscribe(
          () => {
            // Если не скинуть флорму, тогда сработает ошибка валидации на поле "description"
            form.reset();
            form.setValue({
              amount: 0,
              description: '',
              type: 'outcome',
              category: 1
            });
          }
        );
    });
  }

}
