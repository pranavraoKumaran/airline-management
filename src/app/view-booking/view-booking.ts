import { Component, OnInit } from '@angular/core';
import { BookingService } from '../service/booking.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Booking, BookingDTO, BookingStatus, FrequentFlyerStatus, Gender, PaymentMethod, PaymentStatus, Status } from '../models/model';

@Component({
  selector: 'app-view-booking',
  imports: [FormsModule, RouterModule, HttpClientModule, CommonModule],
  templateUrl: './view-booking.html',
  styleUrl: './view-booking.css'
})
export class ViewBooking implements OnInit {

  constructor(private bookingService: BookingService) { }

  booking: Booking = {
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

  detailsBooking: BookingDTO = {
    bookingDate: new Date(), customer: {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: new Date,
      loyaltyPoints: 0,
      frequentFlyer: {
        id: 0,
        membershipNumber: 0,
        status: FrequentFlyerStatus.silver,
        pointsEarned: 0,
        tierExpiryDate: new Date()

      }
    }, flight: {
      id: 0,
      flightNumber: '',
      departureAirport: {
        id: 0,
        code: '',
        name: '',
        city: '',
        country: ''
      },
      arrivalAirport: {
        id: 0,
        code: '',
        name: '',
        city: '',
        country: ''
      },
      departureTime: new Date(),
      arrivalTime: new Date(),
      seatCapacity: 0,
      availableSeats: 0,
      status: Status.cancelled
    }, seatNumber: '',
    status: BookingStatus.cancelled,
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
      paymentMethod: PaymentMethod.creditcard,
      paymentStatus: PaymentStatus.failed
    }

  }
  bookings: Booking[] = [];

  ngOnInit(): void {
    this.loadAllBooking();
  }

  loadAllBooking(): void {
    this.bookingService.viewAllBooking().subscribe(
      data => {
        this.bookings = data;
      }
    )
  }
  loadAllDetailsBooking(id: number): void {
    this.bookingService.viewBookingDetails(id).subscribe(
      data => {
        this.detailsBooking = data;
      }
    )
  }

  deleteBooking(id: number): void {
    this.bookingService.deleteBooking(id).subscribe(
      () => {
        this.loadAllBooking();
      }
    )
  }

}
