import { PassengerService } from './../service/passenger-service';
import { Gender, Passenger, Payment } from './../models/model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-passenger',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule, FormsModule],
  templateUrl: './view-passenger.component.html',
  styleUrl: './view-passenger.component.css'
})
export class ViewPassengerComponent implements OnInit {

  passengerId = 0;
  passenger?: Passenger;
  passengers: Passenger[] = [];
  newPassenger: Passenger = { id: 0, name: '', gender: Gender.male, nationality: '', passportNumber: '', age: 0 };
  genders = Object.values(Gender)
  constructor(private pasengerService: PassengerService) { }

  ngOnInit(): void {
    this.loadAllPassengers();
  }

  loadAllPassengers(): void {
    this.pasengerService.viewAllPassengers().subscribe(
      {
        next: data => this.passengers = data
      }
    )

  }
  viewByIdPassenger(): void {
    this.pasengerService.viewByIdPassenger(this.passengerId).subscribe(data => {
      this.passenger = data;
    }
    );
  }

  deletePassenger(id: number): void {
    this.pasengerService.deletePassenger(id).subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }


  populateUpdateForm(passenger: Passenger): void {
    this.newPassenger = { ...passenger };
  }

  updatePassenger(): void {
    if (this.newPassenger.id != null)
      this.pasengerService.updatePassenger(this.newPassenger.id, this.newPassenger).subscribe(
        data => {
          this.ngOnInit();
          this.newPassenger = { id: 0, name: '', gender: Gender.male, nationality: '', passportNumber: '', age: 0 };
        }
      );
  }
}