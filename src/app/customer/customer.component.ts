import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomerService } from '../service/customer.service';
import { Customer, FrequentFlyer, FrequentFlyerStatus } from '../models/model';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {

  constructor(private customerService: CustomerService, cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.loadAllFrequentFlyers();
    this.loadAllCustomers();
  }
  frequentFlyerId = 0;
  customerId = 0;
  viewFrequentFlyer?: FrequentFlyer;
  statues = Object.values(FrequentFlyerStatus);

  viewCustomer?: Customer;
  addFrequentFlyerData: FrequentFlyer = {
    membershipNumber: 0,
    status: FrequentFlyerStatus.silver,
    pointsEarned: 0,
    tierExpiryDate: new Date()
  };



  /*frequentFlyer: FrequentFlyer = {
    id: 0,
    membershipNumber: 0,
    status: FrequentFlyerStatus.silver,
    pointsEarned: 0,
    tierExpiryDate: new Date()
  };*/
  frequentFlyerUpdate: FrequentFlyer = {
    id: 0,
    membershipNumber: 0,
    status: FrequentFlyerStatus.silver,
    pointsEarned: 0,
    tierExpiryDate: new Date()
  };

  updateFormFrequentFlyer: Boolean = false;
  updateFormCustomer: Boolean = false;
  frequentFlyerList: FrequentFlyer[] = [];
  customerList: Customer[] = [];
  addCustomerData: Customer = {
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
  }
  updateCustomerData: Customer = {
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

  }


  addCustomer(): void {
    this.customerService.addCustomer(this.addCustomerData).subscribe(
      data => {
        this.customerList.push(data);
        this.addCustomerData = {
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

        }

      }
    )
  }

  addFrequentFlyer(): void {

    this.customerService.addFrequentFlyer(this.addFrequentFlyerData).subscribe(
      data => {
        this.addFrequentFlyerData = {
          membershipNumber: 0,
          status: FrequentFlyerStatus.silver,
          pointsEarned: 0,
          tierExpiryDate: new Date()

        }
        this.loadAllFrequentFlyers()
      }
    );
  }

  loadAllCustomers(): void {
    this.customerService.viewAllCustomer().subscribe(
      data => {
        this.customerList = data;
      }
    )

  }
  loadAllFrequentFlyers(): void {
    this.customerService.viewAllFrequentFlyer().subscribe(
      data => {
        this.frequentFlyerList = data;
      }
    )
  }

  viewByIdFrequentFlyer(): void {
    this.customerService.viewByIdFrequentFlyer(this.frequentFlyerId).subscribe(
      data => {
        this.viewFrequentFlyer = data;
      }
    );
  }

  deleteFrequentFlyer(id: number): void {
    this.customerService.deleteFrequentFlyer(id).subscribe(
      () => {
        this.loadAllFrequentFlyers();
      }
    )
  }

  deleteCustomer(id: number): void {
    this.customerService.deleteCustomer(id).subscribe(
      () => {
        this.loadAllCustomers();
      }
    )
  }

  populateUpdateFormCustomer(newCustomer: Customer): void {
    this.updateCustomerData = { ...newCustomer }
    this.updateFormCustomer = true;
  }

  updateCustomer(): void {
    this.customerService.updateCustomer(this.updateCustomerData.id!, this.updateCustomerData).subscribe(
      data => {
        this.loadAllCustomers();
        this.updateCustomerData = {
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

        }
        this.updateFormCustomer = false;
      }
    )
  }

  populateUpdateFormFrequentFlyer(newFrequentFlyer: FrequentFlyer): void {
    this.frequentFlyerUpdate = { ...newFrequentFlyer }
    this.updateFormFrequentFlyer = true
  }

  UpdateFrequentFlyer(): void {
    this.customerService.updateFrequentFlyer(this.frequentFlyerUpdate.id!, this.frequentFlyerUpdate).subscribe(
      () => {
        this.loadAllFrequentFlyers();
        this.frequentFlyerUpdate = {
          id: 0,
          membershipNumber: 0,
          status: FrequentFlyerStatus.silver,
          pointsEarned: 0,
          tierExpiryDate: new Date()

        }
        this.updateFormFrequentFlyer = false;
      }
    )
  }

  viewByIdCustomer(): void {
    this.customerService.viewByIdCustomer(this.customerId!).subscribe(
      data => {
        this.viewCustomer = data;
      }
    )
  }




}
