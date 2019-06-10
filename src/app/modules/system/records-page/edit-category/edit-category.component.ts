import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../shared/models/category.model';
import { CategoriesService } from '../../shared/services/categories.service';
import { Message } from 'src/app/modules/shared/models/message.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  @Input() categories: Category[];
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onCategoryEdit: EventEmitter<Category> = new EventEmitter();

  currentCategoryId = 1;
  currentCategory: Category;
  message: Message;

  sub1: Subscription;
  
  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.message = new Message('success', '');
    this.onCategoryChange();
  }

  onSubmit(form: NgForm) {
    const { name } = form.value;
    let { capacity } = form.value;

    if (capacity < 0) {
      capacity *= -1;
    }

    const category = new Category(name, capacity, +this.currentCategoryId);

    this.sub1 = this.categoriesService.updateCategory(category).subscribe(
      (cat: Category) => {
        this.onCategoryEdit.emit(category);
        this.message.text = 'Категория успешно отредактрована.';
        window.setTimeout(() => this.message.text = '', 3000);
      }
    );
  }

  onCategoryChange() {
    this.currentCategory = this.categories.find(category => category.id === +this.currentCategoryId);
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
