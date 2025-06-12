import { PaymentServiceService } from './../service/payment-service.service';
import { BookingService } from '../service/booking.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Passenger, Payment, Booking, BookingStatus, PaymentMethod, PaymentStatus, Gender, Customer, Flight } from '../models/model';
import { PassengerService } from '../service/passenger-service';
import { RouterModule } from '@angular/router';
import { CustomerService } from '../service/customer.service';
import { FlightService } from '../service/flight.service';

@Component({
  selector: 'app-add-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './add-booking.component.html',
  styleUrl: './add-booking.component.css'
})
export class AddBookingComponent implements OnInit {
  payment!: Payment;
  paymentList: Payment[] = []
  passenger!: Passenger;
  passengerList: Passenger[] = [];

  statuses = Object.values(BookingStatus);
  bookings: Booking[] = [];
  customers: Customer[] = [];
  flights: Flight[] = [];
  newBooking: Booking = {
    bookingDate: new Date(), customerId: 0, flightId: 0, seatNumber: '', status: BookingStatus.cancelled,
    passenger: {
      id: 0,
      name: '',
      age: 0,
      gender: Gender.male,
      passportNumber: '',
      nationality: ''
    },
    payment: {
      id: 0,
      amount: 0,
      paymentDate: new Date(),
      paymentMethod: PaymentMethod.creditcard, // Example, replace with actual enum value
      paymentStatus: PaymentStatus.failed
    }
  }



  constructor(private bookingService: BookingService, private paymentService: PaymentServiceService, private passengerService: PassengerService, private customerService: CustomerService, private flightService: FlightService) { }

  ngOnInit(): void {
    this.loadPassengers();
    this.loadPayments();
    this.loadFlights();
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.viewAllCustomer().subscribe(
      data => {
        this.customers = data;
      }
    )
  }

  loadFlights(): void {
    this.flightService.viewAllFlights().subscribe(
      data => {
        this.flights = data;
      }
    )
  }

  addBooking(): void {
    this.bookingService.addBooking(this.newBooking).subscribe
      (data => {
        this.bookings.push(data);
        this.newBooking = {
          bookingDate: new Date(), customerId: 0, flightId: 0, seatNumber: '', status: BookingStatus.cancelled,
          passenger: { id: 0, name: '', age: 0, gender: Gender.male, passportNumber: '', nationality: '' },
          payment: { amount: 0, paymentDate: new Date(), paymentMethod: PaymentMethod.creditcard, paymentStatus: PaymentStatus.failed }
        }
      }

      );
  }

  loadPayments() {
    this.paymentService.viewAllPayment().subscribe(
      data => {
        this.paymentList = data;
      }
    )
  }

  loadPassengers() {
    this.passengerService.viewAllPassengers().subscribe(
      data => {
        this.passengerList = data;
      }
    )
  }
}
