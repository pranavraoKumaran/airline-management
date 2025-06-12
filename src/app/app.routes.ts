import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddPassengerComponent } from './add-passenger/add-passenger.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { AddBookingComponent } from './add-booking/add-booking.component';
import { ViewPassengerComponent } from './view-passenger/view-passenger.component';
import { ViewPaymentComponent } from './view-payment/view-payment.component';
import { FlightComponent } from './flight/flight.component';
import { CustomerComponent } from './customer/customer.component';
import { ViewBooking } from './view-booking/view-booking';
import { Testcomponent } from './testcomponent/testcomponent';
import { NotificationComponent } from './notification-component/notification-component';

export const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "passenger/add", component: AddPassengerComponent },
    { path: "payment/add", component: AddPaymentComponent },
    { path: "booking/add", component: AddBookingComponent },
    { path: "passenger/view", component: ViewPassengerComponent },
    { path: "payment/view", component: ViewPaymentComponent },
    { path: "flight", component: FlightComponent },
    { path: "customer", component: CustomerComponent },
    { path: "booking/view", component: ViewBooking },
    { path: "notification", component: NotificationComponent }
];
