import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking, BookingDTO } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = "http://localhost:2002/booking";

  constructor(private http: HttpClient) { }


  addBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.baseUrl}/add`, booking)
  }

  viewBookingById(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.baseUrl}/${id}`);
  }

  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  viewBookingDetails(id: number): Observable<BookingDTO> {
    return this.http.get<BookingDTO>(`${this.baseUrl}/getdetails/${id}`)
  }

  viewAllBooking(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/all`);
  }

}