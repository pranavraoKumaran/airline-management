import { Airport } from './../models/model';
import { FlightService } from './../service/flight.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Flight, Status } from '../models/model';

@Component({
  selector: 'app-flight',
  standalone: true,
  imports: [RouterModule, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.css'
})
export class FlightComponent implements OnInit {

  ngOnInit(): void {
    this.loadAllAirports();
    this.loadAllFlights();
  }
  constructor(private flightService: FlightService, private cdr: ChangeDetectorRef) { }
  statuses = Object.values(Status);
  airports: Airport[] = [];
  flightId = 0;
  airportId = 0;
  viewFlight?: Flight;
  viewAirport?: Airport;
  addAirportData: Airport = {
    code: '',
    name: '',
    city: '',
    country: ''
  };
  newAirport: Airport = {
    id: 0,
    code: '',
    name: '',
    city: '',
    country: ''

  }
  flights: Flight[] = [];
  addFlightData: Flight = {
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
  };

  newFlight: Flight = {
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
  }


  addFlight(): void {
    this.flightService.addFlight(this.addFlightData).subscribe(
      data => {
        this.flights.push(data);
        this.addFlightData = {
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
        }
      }
    );
  }
  addAirport(): void {
    this.flightService.addAirport(this.addAirportData).subscribe(
      data => {
        this.airports.push(data);
        this.addAirportData = { code: '', name: '', city: '', country: '' };
        this.cdr.detectChanges();
      }
    );
  }

  loadAllAirports(): void {
    this.flightService.viewAllAirports().subscribe(
      data => {
        this.airports = data;
      }
    )
  }

  loadAllFlights(): void {
    this.flightService.viewAllFlights().subscribe(
      data => {
        this.flights = data;
      }
    )
  }

  deleteAirport(id: number): void {
    this.flightService.deleteAirport(id).subscribe(
      () => {
        this.airports = this.airports.filter(a => a.id !== id);
        this.cdr.detectChanges();
      }
    )

  }


  deleteFlight(id: number): void {
    this.flightService.deleteFlight(id).subscribe(
      () => {
        this.flights = this.flights.filter(a => a.id !== id);
        this.cdr.detectChanges();
      }
    );
  }

  populateUpdateFormFlight(flight: Flight) {
    this.newFlight = { ...flight };
  }

  updateFlight(): void {
    this.flightService.updateFlight(this.newFlight.id!, this.newFlight).subscribe(
      () => {
        this.loadAllFlights();
        this.newFlight = {
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

        }
      }
    );
  }
  populateUpdateFormAirport(airport: Airport): void {
    this.newAirport = { ...airport };
  }
  updateAirport() {
    this.flightService.updateAirport(this.newAirport.id!, this.newAirport).subscribe(
      () => {
        this.newAirport = {
          id: 0,
          code: '',
          name: '',
          city: '',
          country: ''
        }
        this.cdr.detectChanges();

      }
    );
  }

  viewByIdFlight(id: number): void {
    this.flightService.viewByIdFlight(id).subscribe(
      data => {
        this.viewFlight = data;

      }
    );
  }

  viewByIdAirport(id: number): void {
    this.flightService.viewByIdAirport(id).subscribe(
      data => {
        this.viewAirport = data;
      }
    )
  }

}