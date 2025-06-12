import { Customer } from './../models/model';
import { TestBed } from '@angular/core/testing';

import { CustomerService } from './customer.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FrequentFlyerStatus } from '../models/model';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerService]
    });
    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  let dummyCustomer: Customer = {
    id: 1,
    firstName: 'sample',
    lastName: 'sample',
    email: 'sample',
    phone: 'sample',
    dateOfBirth: new Date,
    loyaltyPoints: 10,
    frequentFlyer: {
      id: 1,
      membershipNumber: 10,
      status: FrequentFlyerStatus.silver,
      pointsEarned: 20,
      tierExpiryDate: new Date()
    }
  };

  let dummyUpdateCustomer: Customer = {
    id: 1,
    firstName: 'sample',
    lastName: 'sample',
    email: 'sample',
    phone: 'sample',
    dateOfBirth: new Date,
    loyaltyPoints: 10,
    frequentFlyer: {
      id: 1,
      membershipNumber: 10,
      status: FrequentFlyerStatus.silver,
      pointsEarned: 20,
      tierExpiryDate: new Date()
    }
  };

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should add a customer successfully via POST',
    () => {
      service.addCustomer(dummyCustomer).subscribe(
        data => {
          expect(data).toEqual(dummyCustomer)
        }
      )
      let req = httpMock.expectOne(`http://localhost:2003/customer/add`);
      expect(req.request.method).toBe('POST');
      req.flush(dummyCustomer);
    }

  );

  it('should view all customer via GET',
    () => {
      let customers: Customer[] = [dummyCustomer]

      service.viewAllCustomer().subscribe(
        data => {
          expect(data).toEqual(customers);
          expect(data.length).toEqual(1);
        }

      )
      let req = httpMock.expectOne(`http://localhost:2003/customer/all`);
      expect(req.request.method).toBe('GET');
      req.flush(customers);
    }
  );

  it('should retrive a customer by id via GET',
    () => {
      let customerId = 1;
      service.viewByIdCustomer(customerId).subscribe(
        data => {
          expect(data).toEqual(dummyCustomer);
        }
      );
      let req = httpMock.expectOne(`http://localhost:2003/customer/${customerId}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyCustomer);
    }
  )

  it('should sucessfully update customer via PUT',
    () => {
      let customerId = 1;
      service.updateCustomer(customerId, dummyUpdateCustomer).subscribe(
        data => {
          expect(data).toEqual(dummyUpdateCustomer);
        }
      );
      let req = httpMock.expectOne(`http://localhost:2003/customer/${customerId}`);
      expect(req.request.method).toBe('PUT');
      req.flush(dummyUpdateCustomer);
    }
  )

});
