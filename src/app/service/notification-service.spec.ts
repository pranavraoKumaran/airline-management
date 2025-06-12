import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification-service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Notification, SentStatus, Type } from '../models/model';

describe('NotificationService', () => {
  let service: NotificationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotificationService]
    });
    service = TestBed.inject(NotificationService);
    httpMock = TestBed.inject(HttpTestingController);
  });



  let dummyNotification: Notification = {
    id: '1',
    customerId: 1,
    message: '',
    type: Type.sms,
    sentStatus: SentStatus.failed,
    sentDate: new Date(),
    notificationTemplate: {
      id: '',
      templateName: '',
      content: ''

    }
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a notification successfully via POST',
    () => {
      service.addNotification(dummyNotification).subscribe(
        data => {
          expect(data).toEqual(dummyNotification);
        }
      );

      let req = httpMock.expectOne(`http://localhost:2004/notification/add`);
      expect(req.request.method).toBe('POST');
      req.flush(dummyNotification);
    }
  );

  it('should view a notification by id via GET',
    () => {
      let notificationId = 1;
      service.viewNotification(notificationId).subscribe(
        data => {
          expect(data).toEqual(dummyNotification);
        }
      );
      let req = httpMock.expectOne(`http://localhost:2004/notification/${notificationId}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyNotification);
    }
  );

  it('should view all notifications via GET',
    () => {
      let notificationList: Notification[] = [dummyNotification];

      service.viewAllNotification().subscribe(
        data => {
          expect(data).toEqual(notificationList);
          expect(data.length).toBe(1);
        }
      );
      let req = httpMock.expectOne(`http://localhost:2004/notification/all`)
      expect(req.request.method).toBe('GET');
      req.flush(notificationList);
    })
});


