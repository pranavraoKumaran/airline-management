import { PassengerService } from './../service/passenger-service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Gender, Passenger } from '../models/model';

@Component({
  selector: 'app-add-passenger',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-passenger.component.html',
  styleUrl: './add-passenger.component.css'
})


export class AddPassengerComponent {

  genders = Object.values(Gender);
  passengers: Passenger[] = [];
  newPassenger: Passenger = {
    name: '',
    age: 0,
    gender: Gender.male,
    passportNumber: '',
    nationality: ''
  };
  constructor(private passengerService: PassengerService) { }


  addPassenger(): void {
    this.passengerService.addPassenger(this.newPassenger).subscribe
      (data => {
        this.passengers.push(data);
        this.newPassenger = { name: '', age: 0, gender: Gender.male, passportNumber: '', nationality: '' }
      });
  }
}