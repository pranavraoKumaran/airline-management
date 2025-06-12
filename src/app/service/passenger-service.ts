import { Passenger } from './../models/model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class PassengerService {

    private baseUrl = "http://localhost:2002/booking/passenger";

    constructor(private http: HttpClient) { }

    addPassenger(passenger: Passenger): Observable<Passenger> {
        return this.http.post<Passenger>(`${this.baseUrl}/add`, passenger);
    }

    viewAllPassengers(): Observable<Passenger[]> {
        return this.http.get<Passenger[]>(`${this.baseUrl}/all`);
    }

    viewByIdPassenger(id: number): Observable<Passenger> {
        return this.http.get<Passenger>(`${this.baseUrl}/${id}`);
    }

    deletePassenger(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    updatePassenger(id: number, passenger: Passenger): Observable<Passenger> {
        return this.http.put<Passenger>(`${this.baseUrl}/${id}`, passenger);
    }
}