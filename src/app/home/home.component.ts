import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxComponent } from './inbox/inbox.component';
import { NotificationService } from '../shared/service/notification.service';
import { Notification } from '../shared/models/notification.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, InboxComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.getNotifications()
  }


  private getNotifications(): void {
    this.notifications = this.notificationService.getAllNotifications()
  }

}
