import { CustomerService } from './../service/customer.service';
import { Customer, NotificationTemplate } from './../models/model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Notification, SentStatus, Type } from '../models/model';
import { NotificationService } from '../service/notification-service';

@Component({
  selector: 'app-notification-component',
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
  templateUrl: './notification-component.html',
  styleUrl: './notification-component.css'
})
export class NotificationComponent implements OnInit {

  constructor(private notificationService: NotificationService, private customerService: CustomerService) { }

  notificationList: Notification[] = [];
  customerList: Customer[] = [];
  notificationTemplateList: NotificationTemplate[] = [];

  types = Object.values(Type);
  sentstatuses = Object.values(SentStatus);

  notificationTemplate: NotificationTemplate = {
    templateName: '',
    content: ''

  }
  notification: Notification = {
    customerId: 0,
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

  ngOnInit(): void {
    this.loadAllNotification();
    this.loadAllCustomer();
    this.loadAllNotificationTemplate();
  }
  addNotification(): void {
    this.notificationService.addNotification(this.notification).subscribe(
      data => {
        this.notificationList.push(data);
        this.notification = {
          customerId: 0,
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

      }
    );
  }

  addNotificationTemplate(): void {
    this.notificationService.addNotificationTemplate(this.notificationTemplate).subscribe(
      data => {
        this.notificationTemplateList.push(data);
        this.notificationTemplate = {
          templateName: '',
          content: ''
        }
      }
    )
  }

  loadAllNotification(): void {
    this.notificationService.viewAllNotification().subscribe(
      data => {
        this.notificationList = data;
      }
    );
  }

  loadAllNotificationTemplate(): void {
    this.notificationService.viewAllNotificationTemplate().subscribe(
      data => {
        this.notificationTemplateList = data;
      }
    )
  }

  loadAllCustomer(): void {
    this.customerService.viewAllCustomer().subscribe(
      data => {
        this.customerList = data;
      }
    )
  }

  deleteNotificationTemplate(id: string): void {
    this.notificationService.deleteNotificationTemplate(id).subscribe(
      () => {
        this.ngOnInit();

      }
    )
  }

  deleteNotification(id: string): void {
    this.notificationService.deleteNotification(id).subscribe(
      () => {
        this.ngOnInit();
      }
    )
  }


}
