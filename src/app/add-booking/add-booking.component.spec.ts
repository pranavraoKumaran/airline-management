import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AddBookingComponent } from './add-booking.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PaymentMethod, PaymentStatus } from '../models/model';

describe('AddBookingComponent', () => {
  let component: AddBookingComponent;
  let fixture: ComponentFixture<AddBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule, CommonModule, AddBookingComponent, RouterTestingModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render heading "Add Booking"', () => {
    const heading = fixture.nativeElement.querySelector('h2');
    expect(heading.textContent).toContain('Booking Form');
  });

  it('should bind seatNumber input to booking.seatNumber', () => {
    const input = fixture.debugElement.query(By.css('input[name="seatNumber"]')).nativeElement;
    input.value = '123'
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.newBooking.seatNumber).toBe('123');
  })

  it('should call addBooking() on form submit', () => {
    spyOn(component, 'addBooking');
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);
    expect(component.addBooking).toHaveBeenCalled();

  });

  it('should populate payment dropdown with options', () => {
    component.paymentList = [
      {
        id: 1,
        amount: 0,
        paymentDate: new Date(),
        paymentMethod: PaymentMethod.creditcard,
        paymentStatus: PaymentStatus.success
      }, {
        id: 2,
        amount: 0,
        paymentDate: new Date(),
        paymentMethod: PaymentMethod.creditcard,
        paymentStatus: PaymentStatus.success
      }];

    fixture.detectChanges();
    const options = fixture.debugElement.queryAll(By.css('select[name="payment"] option'));

    expect(options.length).toBe(2);
    expect(options[0].nativeElement.textContent.trim()).toBe('1');
    expect(options[1].nativeElement.textContent.trim()).toBe('2');

  })


});
