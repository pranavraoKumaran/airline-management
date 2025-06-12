import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer, FrequentFlyer } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  private baseUrl = "http://localhost:2003/customer";
  constructor(private http: HttpClient) { }


  addFrequentFlyer(frequentFlyer: FrequentFlyer): Observable<FrequentFlyer> {
    return this.http.post<FrequentFlyer>(`${this.baseUrl}/frequentflyer/add`, frequentFlyer);
  }

  viewAllFrequentFlyer(): Observable<FrequentFlyer[]> {
    return this.http.get<FrequentFlyer[]>(`${this.baseUrl}/frequentflyer/all`);
  }

  viewByIdFrequentFlyer(id: number): Observable<FrequentFlyer> {
    return this.http.get<FrequentFlyer>(`${this.baseUrl}/frequentflyer/${id}`);
  }

  deleteFrequentFlyer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/frequentflyer/${id}`);
  }

  updateFrequentFlyer(id: number, frequentFlyer: FrequentFlyer): Observable<FrequentFlyer> {
    return this.http.put<FrequentFlyer>(`${this.baseUrl}/frequentflyer/${id}`, frequentFlyer);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.baseUrl}/add`, customer);
  }

  viewAllCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}/all`);
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateCustomer(id: number, customer: Customer): Observable<Customer> {

    return this.http.put<Customer>(`${this.baseUrl}/${id}`, customer);
  }

  viewByIdCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/${id}`);
  }
}
