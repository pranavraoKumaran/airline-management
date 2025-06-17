import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BookingService } from './booking.service';
import { Booking, BookingDTO, BookingStatus, FrequentFlyerStatus, Gender, PaymentMethod, PaymentStatus, Status } from '../models/model';

describe('BookingService', () => {
  let service: BookingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookingService]
    });
    service = TestBed.inject(BookingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  const dummyBookingDTO: BookingDTO = {
    id: 1,
    customer: {
      id: 1,
      firstName: 'sample',
      lastName: 'sample',
      email: 'sample',
      phone: 'sample',
      dateOfBirth: new Date,
      loyaltyPoints: 10,
      frequentFlyer: {
        id: 1,
        membershipNumber: 0,
        status: FrequentFlyerStatus.silver,
        pointsEarned: 0,
        tierExpiryDate: new Date()

      }
    },
    flight: {
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
      seatCapacity: 100,
      availableSeats: 100,
      status: Status.cancelled

    },
    bookingDate: new Date(),
    status: BookingStatus.booked,
    seatNumber: 'seat',
    payment: {
      id: 1,
      amount: 100,
      paymentDate: new Date,
      paymentMethod: PaymentMethod.creditcard,
      paymentStatus: PaymentStatus.failed

    },
    passenger: {
      id: 1,
      name: 'sample',
      age: 50,
      gender: Gender.male,
      passportNumber: '1313',
      nationality: 'adadafa'

    }

  }
  const dummyBooking: Booking = {
    id: 1,
    customerId: 101,
    flightId: 1,
    bookingDate: new Date(),
    status: BookingStatus.booked,
    seatNumber: 'seat',
    payment: {
      id: 1,
      amount: 100,
      paymentDate: new Date,
      paymentMethod: PaymentMethod.creditcard,
      paymentStatus: PaymentStatus.failed

    },
    passenger: {
      id: 1,
      name: 'sample',
      age: 50,
      gender: Gender.male,
      passportNumber: '1313',
      nationality: 'adadafa'

    }


  };

  const dummyUpdateBooking: Booking = {
    id: 1,
    customerId: 101,
    flightId: 1,
    bookingDate: new Date(),
    status: BookingStatus.booked,
    seatNumber: 'seat',
    payment: {
      id: 1,
      amount: 100,
      paymentDate: new Date,
      paymentMethod: PaymentMethod.creditcard,
      paymentStatus: PaymentStatus.failed

    },
    passenger: {
      id: 1,
      name: 'sample',
      age: 50,
      gender: Gender.male,
      passportNumber: '1313',
      nationality: 'adadafa'
    }
  };

  it('should be created', () => {
    expect(service).toBeTruthy();

  });

  it('should add a booking via POST', () => {
    service.addBooking(dummyBooking).subscribe(
      data => {
        expect(data).toEqual(dummyBooking);
      });

    const req = httpMock.expectOne('http://localhost:2002/booking/add')
    expect(req.request.method).toBe('POST');
    req.flush(dummyBooking);
  });

  it('should view a booking via GET',
    () => {
      const bookingId = 1;

      service.viewBookingById(bookingId).subscribe(
        data => {
          expect(data).toEqual(dummyBooking);
        }
      );

      const req = httpMock.expectOne(`http://localhost:2002/booking/${bookingId}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyBooking);
    });

  it('should get all bookings via GET',
    () => {
      const bookings: Booking[] = [dummyBooking];
      service.viewAllBooking().subscribe(
        data => {
          expect(data.length).toBe(1);
          expect(data).toEqual(bookings);
        }
      );

      const req = httpMock.expectOne(`http://localhost:2002/booking/all`);
      expect(req.request.method).toBe('GET');
      req.flush(bookings);
    });

  it('should get details of Booking via GET',
    () => {
      const bookingId = 1;
      service.viewBookingDetails(bookingId).subscribe(
        data => {
          expect(data).toEqual(dummyBookingDTO);
        }
      )
      const req = httpMock.expectOne(`http://localhost:2002/booking/getdetails/${bookingId}`)
      expect(req.request.method).toBe('GET');
      req.flush(dummyBookingDTO);
    });


});


