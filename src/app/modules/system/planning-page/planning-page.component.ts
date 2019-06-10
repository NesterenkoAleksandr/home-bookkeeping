import { Component, OnInit } from '@angular/core';
import { BillService } from '../shared/services/bill.service';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { combineLatest } from 'rxjs';
import { Bill } from '../shared/models/bill.model';
import { Category } from '../shared/models/category.model';
import { AppEvent } from '../shared/models/event.model';


@Component({
  selector: 'app-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit {

  isLoaded = false;
  bill: Bill;
  categories: Category[] = [];
  events: AppEvent[] = [];

  constructor(
    private billService: BillService,
    private categoriesService: CategoriesService,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    combineLatest(this.billService.getBill(), this.categoriesService.getCategories(), this.eventsService.getEvents()).subscribe(
        (data: [Bill, Category[], AppEvent[]]) => {
          this.bill = data[0];
          this.categories = data[1];
          this.events = data[2];

          console.log(data);

          this.isLoaded = true;
        }
      );
  }

}
