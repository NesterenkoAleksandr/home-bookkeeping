import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { EventsService } from '../../shared/services/events.service';
import { CategoriesService } from '../../shared/services/categories.service';
import { mergeMap } from 'rxjs/operators';
import { AppEvent } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {
  event: AppEvent;
  category: Category;

  isLoaded = false;
  sub1: Subscription;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private categoriesService: CategoriesService,
    private title: Title) {
    title.setTitle('Домашняя бухгалтерия | Страница счета | Детально');
  }

  ngOnInit() {
    this.sub1 = this.route.params.pipe(
      mergeMap((params: Params) => this.eventsService.getEventById(params.id)),
      mergeMap((event: AppEvent) => {
        this.event = event;
        return this.categoriesService.getCategoryById(event.category);
      })
    ).subscribe((category: Category) => {
      this.category = category;

      this.isLoaded = true;
    });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
