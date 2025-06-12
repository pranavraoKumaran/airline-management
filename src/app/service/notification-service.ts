import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notification, NotificationTemplate } from '../models/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private http: HttpClient) { }

  private baseUrl = "http://localhost:2004/notification";

  addNotification(notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(`${this.baseUrl}/add`, notification);
  }

  addNotificationTemplate(notificationTemplate: NotificationTemplate): Observable<NotificationTemplate> {
    return this.http.post<NotificationTemplate>(`${this.baseUrl}/notificationtemplate/add`, notificationTemplate);
  }

  viewNotificationTemplate(id: number): Observable<NotificationTemplate> {
    return this.http.get<NotificationTemplate>(`${this.baseUrl}/notificationtemplate/${id}`);
  }

  viewAllNotificationTemplate(): Observable<NotificationTemplate[]> {
    return this.http.get<NotificationTemplate[]>(`${this.baseUrl}/notificationtemplate/all`);
  }

  viewNotification(id: number): Observable<Notification> {
    return this.http.get<Notification>(`${this.baseUrl}/${id}`);
  }

  viewAllNotification(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/all`);
  }

  deleteNotificationTemplate(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/notificationtemplate/${id}`)
  }

  deleteNotification(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
