import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { Subscription, combineLatest } from 'rxjs';
import * as moment from 'moment';

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
  filteredEvents: AppEvent[] = [];
  chartData: any[] = [];

  isFilterVisible = false;

  sub1: Subscription;

  constructor(private categoriesService: CategoriesService, private eventsService: EventsService) { }

  ngOnInit() {
    this.sub1 = combineLatest( this.categoriesService.getCategories(), this.eventsService.getEvents()).subscribe(
      (data: [Category[], AppEvent[]]) => {
        this.categories = data[0];
        this.events = data[1];

        this.setOriginalEvents();
        this.calculateChartData();

        this.isLoaded = true;
      }
    );
  }

  private setOriginalEvents(): void {
    this.filteredEvents = this.events.slice();
  }

  calculateChartData(): void {
    this.chartData = [];

    this.categories.forEach((category: Category) => {
      const categoryEvents: AppEvent[] = this.filteredEvents.filter(event => event.category === category.id && event.type === 'outcome');

      this.chartData.push({
        name: category.name,
        value: categoryEvents.reduce((total: number, event: AppEvent) => total += event.amount, 0)
      });
    });
  }

  private toggleFilterVisibility(direction: boolean): void {
    this.isFilterVisible = direction;
  }

  openFilter(): void {
    this.toggleFilterVisibility(true);
  }

  onFilterApply(filterData): void {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.filteredEvents = this.filteredEvents
      .filter(event => {
        return filterData.types.length ? filterData.types.indexOf(event.type) !== -1 : event;
      })
      .filter(event => {
        return filterData.categories.length ? filterData.categories.indexOf(event.category.toString()) !== -1 : event;
      }).filter(event => {
        const momentDate = moment(event.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      });

    this.calculateChartData();
  }

  onFilterCancel(): void {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
