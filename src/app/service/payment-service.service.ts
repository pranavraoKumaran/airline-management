import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../models/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  private baseUrl = "http://localhost:2002/booking/payment";
  constructor(private http: HttpClient) { }

  addPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${this.baseUrl}/add`, payment);
  }

  viewPaymentById(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.baseUrl}/${id}`)
  }

  viewAllPayment(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseUrl}/all`)
  }
}
