import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${ environment.apiUrl }/users?email=${email}`).pipe(
      map ((response: User) => response[0] || undefined)
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${ environment.apiUrl}/users`, user).pipe(
      map((response: User) => response)
    );
  }
}
