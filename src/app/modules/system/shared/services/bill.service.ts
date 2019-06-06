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
    return this.http.get<Bill>(`${ environment.apiUrl }/bill`).pipe(
      map ((response: Bill) => response)
    );
  }

  getCurrency(base: string = 'EUR'): Observable<any> {
    // Free subscription Plan does not support &base. Now.
    return this.http.get(`${ environment.apiCurrency }&symbols=USD,RUB,UAH,PLN&format=1`).pipe(
      map ((response: any) => response)
    );
  }
}
