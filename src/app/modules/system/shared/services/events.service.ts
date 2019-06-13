import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppEvent } from '../models/event.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(public http: HttpClient) { }

  addEvent(event: AppEvent): Observable<AppEvent> {
    return this.http.post<AppEvent>(`${ environment.apiUrl}/events`, event).pipe(
      map((response: AppEvent) => response)
    );
  }

  getEvents(): Observable<AppEvent[]> {
    return this.http.get<AppEvent[]>(`${ environment.apiUrl }/events`);
  }

  getEventById(id: string): Observable<AppEvent> {
    return this.http.get<AppEvent>(`${ environment.apiUrl }/events/${id}`);
  }
}
