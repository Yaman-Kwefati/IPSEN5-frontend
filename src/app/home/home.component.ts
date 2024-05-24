import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxComponent } from './inbox/inbox.component';
import { NotificationService } from '../shared/service/notification.service';
import { Notification } from '../shared/models/notification.model';
import { LucideAngularModule } from 'lucide-angular';
import { UpcomingReservationsComponent } from './upcoming-reservations/upcoming-reservations.component';
import { DefaultLocationComponent } from './default-location/default-location.component';
import { RouterModule } from '@angular/router';
import { userPreferencesModel } from '../shared/models/userpreferences.model';
import { CreateReservationService } from '../shared/service/create-reservation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    InboxComponent, 
    LucideAngularModule, 
    UpcomingReservationsComponent,
    DefaultLocationComponent,
    RouterModule
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

  public favoriteLocation!: userPreferencesModel;

  constructor(private notificationService: NotificationService, private createReservationService: CreateReservationService) {}

  ngOnInit(): void {
    this.getNotifications()
    this.getFavoriteLocation()
  }


  private getNotifications(): void {
    this.notifications = this.notificationService.getAllNotifications()
  }

  private getFavoriteLocation(): void {
    this.favoriteLocation = this.createReservationService.getUserPrefs();
  }

}
