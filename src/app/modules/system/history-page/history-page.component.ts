import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { Subscription, combineLatest } from 'rxjs';

import { Category } from '../shared/models/category.model';
import { AppEvent } from '../shared/models/event.model';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {
  isLoaded = false;
  categories: Category[] = [];
  events: AppEvent[] = [];
  chartData: any[] = [];

  sub1: Subscription;

  constructor(private categoriesService: CategoriesService, private eventsService: EventsService) { }

  ngOnInit() {
    this.sub1 = combineLatest( this.categoriesService.getCategories(), this.eventsService.getEvents()).subscribe(
      (data: [Category[], AppEvent[]]) => {
        this.categories = data[0];
        this.events = data[1];
        this.calculateChartData();

        this.isLoaded = true;
      }
    );
  }

  calculateChartData(): void {
    this.chartData = [];

    this.categories.forEach((category: Category) => {
      const categoryEvents: AppEvent[] = this.events.filter(event => event.category === category.id && event.type === 'outcome');

      this.chartData.push({
        name: category.name,
        value: categoryEvents.reduce((total: number, event: AppEvent) => total += event.amount, 0)
      });
    });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
