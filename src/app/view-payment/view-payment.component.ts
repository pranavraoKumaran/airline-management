import { PaymentServiceService } from './../service/payment-service.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Payment } from '../models/model';

@Component({
  selector: 'app-view-payment',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule],
  templateUrl: './view-payment.component.html',
  styleUrl: './view-payment.component.css'
})
export class ViewPaymentComponent implements OnInit {

  paymentId = 0;
  payment!: Payment;
  payments: Payment[] = [];
  constructor(private paymentService: PaymentServiceService, private cdr: ChangeDetectorRef) { }

  viewByIdPayment(): void {
    this.paymentService.viewPaymentById(this.paymentId).subscribe(
      data => {
        this.payment = data;
        this.cdr.detectChanges()
      }
    );
  }

  ngOnInit(): void {
    this.paymentService.viewAllPayment().subscribe(
      data => this.payments = data
    );
  }
}
