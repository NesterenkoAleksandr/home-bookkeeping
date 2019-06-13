import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${ environment.apiUrl}/categories`, category).pipe(
      map((response: Category) => response)
    );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${ environment.apiUrl }/categories`).pipe(
      map ((categories: Category[]) => categories)
    );
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${ environment.apiUrl }/categories/${id}`);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put(`${ environment.apiUrl }/categories/${ category.id }`, category).pipe(
      map((response: Category) => response)
    );
  }
}
