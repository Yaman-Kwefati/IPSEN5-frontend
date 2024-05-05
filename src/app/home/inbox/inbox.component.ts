import { Component, Input } from '@angular/core';
import { Notification } from '../../shared/models/notification.model';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [CommonModule, NotificationComponent],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss'
})
export class InboxComponent {
  @Input() notifications: Notification[] = [];

}
