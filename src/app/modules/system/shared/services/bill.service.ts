import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }

  getBill(): Observable<Bill> {
    return this.http.get<Bill>(`${ environment.apiUrl }/bill`);
  }

  updateBill(bill: Bill): Observable<Bill> {
    return this.http.put(`${ environment.apiUrl }/bill`, bill).pipe(
      map((res: Bill) => res)
    );
  }

  getCurrency(filter: string[] = ['USD', 'RUB', 'EUR', 'UAH']): Observable<any> {
    return this.http.get(`${ environment.apiCurrency }`).pipe(
      map ((response: any) => response.filter(item => filter.some(value => item.cc === value.toUpperCase())))
    );
  }
}
