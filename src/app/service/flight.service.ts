import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Airport, Flight } from '../models/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private baseUrl = "http://localhost:2001/flight";
  constructor(private http: HttpClient) { }

  addAirport(airport: Airport): Observable<Airport> {
    return this.http.post<Airport>(`${this.baseUrl}/airport/add`, airport);
  }

  addFlight(flight: Flight): Observable<Flight> {
    return this.http.post<Flight>(`${this.baseUrl}/add`, flight);
  }

  viewAllAirports(): Observable<Airport[]> {
    return this.http.get<Airport[]>(`${this.baseUrl}/airport/all`);
  }

  viewAllFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.baseUrl}/all`);
  }

  deleteAirport(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/airport/${id}`);
  }

  deleteFlight(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateFlight(id: number, flight: Flight): Observable<Flight> {
    return this.http.put<Flight>(`${this.baseUrl}/${id}`, flight);
  }
  updateAirport(id: number, airport: Airport): Observable<Airport> {
    return this.http.put<Airport>(`${this.baseUrl}/airport/${id}`, airport);
  }

  viewByIdFlight(id: number): Observable<Flight> {
    return this.http.get<Flight>(`${this.baseUrl}/${id}`);
  }

  viewByIdAirport(id: number): Observable<Airport> {
    return this.http.get<Airport>(`${this.baseUrl}/airport/${id}`);
  }
}
