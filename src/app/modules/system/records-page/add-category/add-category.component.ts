import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onCategoryAdd: EventEmitter<Category> = new EventEmitter();

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    // tslint:disable-next-line:prefer-const
    let { name, capacity } = form.value;

    if (capacity < 0) {
      capacity *= -1;
    }

    const category = new Category(name, capacity);

    this.categoriesService.addCategory(category).subscribe(
      (cat: Category) => {
        form.reset();
        form.form.patchValue({capacity: 1});

        this.onCategoryAdd.emit(category);
      }
    );
  }
}
