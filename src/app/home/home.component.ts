import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxComponent } from './inbox/inbox.component';
import { NotificationService } from '../shared/service/notification.service';
import { Notification } from '../shared/models/notification.model';
import { LucideAngularModule } from 'lucide-angular';
import { UpcomingReservationsComponent } from './upcoming-reservations/upcoming-reservations.component';
import { DefaultLocationComponent } from './default-location/default-location.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    InboxComponent, 
    LucideAngularModule, 
    UpcomingReservationsComponent,
    DefaultLocationComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public notifications: Notification[] = [];
  public upcomingReservations: {
    id: string,
    location: {
      location: string,
      address: string,
      city: string,
      zip: string
    },
    wing: string,
    floor: string,
    room: string,
    type: string, 
    startDateTime: Date
  }[] = [];
  public favoriteLocation!: {
    location: string,
    floor: number,
    wing: string,
  };

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.getNotifications()
    this.getUpcomingReservations()
    this.getFavoriteLocation()
  }


  private getNotifications(): void {
    this.notifications = this.notificationService.getAllNotifications()
  }

  private getUpcomingReservations(): void {
    this.upcomingReservations = [
      {
        id: '',
        location: {
          location: 'George Hintzenweg 89, 3068 AX Rotterdam',
          address: 'George Hintzenweg 89',
          city: 'Rotterdam',
          zip: '3068 AX'
        },
        wing: '',
        floor: '',
        room: '',
        type: '', 
        startDateTime: new Date()
      },
      {
        id: '',
        location: {
          location: 'De Entree 21, 1101 BH Amsterdam',
          address: 'De Entree 21',
          city: 'Amsterdam',
          zip: '1101 BH'
        },
        wing: '',
        floor: '',
        room: '',
        type: '', 
        startDateTime: new Date()
      },
      {
        id: '',
        location: {
          location: 'George Hintzenweg 89, 3068 AX Rotterdam',
          address: 'George Hintzenweg 89',
          city: 'Rotterdam',
          zip: '3068 AX'
        },
        wing: '',
        floor: '',
        room: '',
        type: '', 
        startDateTime: new Date()
      },
    ]
    // TODO: connect this to the ReservationService
  }

  private getFavoriteLocation(): void {
    this.favoriteLocation = {
      location: 'George Hintzenweg 89, 3068 AX Rotterdam',
      floor: 5,
      wing: 'Links'
    }
    // TODO: connect this to the ReservationService
      
  }

}
