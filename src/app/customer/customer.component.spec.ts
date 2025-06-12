import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerComponent } from './customer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

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

  it('',
    () => {

    }
  )

});
