import { PaymentServiceService } from './../service/payment-service.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Payment, PaymentMethod, PaymentStatus } from '../models/model';

@Component({
  selector: 'app-add-payment',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-payment.component.html',
  styleUrl: './add-payment.component.css'
})
export class AddPaymentComponent {

  payments: Payment[] = [];

  paymentMethods = Object.values(PaymentMethod);
  paymentStatuses = Object.values(PaymentStatus);
  newPayment: Payment = {
    amount: 0,
    paymentDate: new Date(),
    paymentMethod: PaymentMethod.creditcard,
    paymentStatus: PaymentStatus.failed
  };

  constructor(private paymentService: PaymentServiceService) { }

  addPayment(): void {
    this.paymentService.addPayment(this.newPayment).subscribe
      (data => {
        this.payments.push(data);
        this.newPayment = { amount: 0, paymentDate: new Date(), paymentMethod: PaymentMethod.creditcard, paymentStatus: PaymentStatus.failed }
      });
  }

}
