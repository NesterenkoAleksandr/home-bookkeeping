import { Component, OnInit } from '@angular/core';
import { BillService } from '../shared/services/bill.service';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { combineLatest } from 'rxjs';
import { Bill } from '../shared/models/bill.model';
import { Category } from '../shared/models/category.model';
import { AppEvent } from '../shared/models/event.model';
import { Title } from '@angular/platform-browser';


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
    private eventsService: EventsService,
    private title: Title) {
      title.setTitle('Домашняя бухгалтерия | Страница планирования'); }

  ngOnInit() {
    combineLatest(this.billService.getBill(), this.categoriesService.getCategories(), this.eventsService.getEvents()).subscribe(
        (data: [Bill, Category[], AppEvent[]]) => {
          this.bill = data[0];
          this.categories = data[1];
          this.events = data[2];

          this.isLoaded = true;
        }
      );
  }

  getCategoryCost(category: Category): number {
    const categoryEvents: AppEvent[] = this.events.filter(event => event.category === category.id && event.type === 'outcome');

    return categoryEvents.reduce((total, event) => total += event.amount, 0);
  }

  private getPercent(category: Category): number {
    const percent = (100 * this.getCategoryCost(category)) / category.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCategoryUsingPercent(category: Category): string {
    return `${this.getPercent(category)}%`;
  }

  getCategoryColorClass(category: Category): string {
    const percent = this.getPercent(category);

    return percent < 60 ? 'success' : (percent >= 100 ? 'danger' : 'warning');
  }

}
