import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerComponent } from './customer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { FrequentFlyerStatus } from '../models/model';

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerComponent, RouterTestingModule, FormsModule, CommonModule, HttpClientModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind membershipNumber to addCustomerData.firstName',
    () => {
      let input = fixture.debugElement.query(By.css('input[name="firstName"]')).nativeElement;
      input.value = 'sample';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.addCustomerData.firstName).toBe('sample');
    }
  );

  it('should call addCustomer() on form submit',
    () => {
      spyOn(component, 'addCustomer');
      let form = fixture.debugElement.query(By.css('form[name="addCustomerForm"]'));
      form.triggerEventHandler('ngSubmit', null);
      expect(component.addCustomer).toHaveBeenCalled();
    });

  it('should call viewByIdCustomer() on button click',
    () => {
      spyOn(component, 'viewByIdCustomer');
      let button = fixture.debugElement.query(By.css('button[name="viewByIdButton"]'));
      button.triggerEventHandler('click', null);
      expect(component.viewByIdCustomer).toHaveBeenCalled();
    }
  );



  it('should display table',
    () => {
      component.customersFilled = true
      fixture.detectChanges();
      let table = fixture.debugElement.query(By.css('table[name="customerTable"]')).nativeElement;
      expect(table).toBeTruthy();
    });

  it('checks table is not empty',
    () => {

      component.customersFilled = true;
      component.customerList = [
        {
          id: 1,
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
      ];
      fixture.detectChanges();
      let table = fixture.debugElement.query(By.css('table[name="customerTable"]')).nativeElement;
      let rows = table.querySelectorAll('tr');
      expect(rows.length).toBeGreaterThanOrEqual(1);
    }
  )
});
