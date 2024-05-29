import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxComponent } from './inbox/inbox.component';
import { NotificationService } from '../shared/service/notification.service';
import { LucideAngularModule } from 'lucide-angular';
import { UpcomingReservationsComponent } from './upcoming-reservations/upcoming-reservations.component';
import { DefaultLocationComponent } from './default-location/default-location.component';
import { RouterModule } from '@angular/router';
import { CreateReservationService } from '../shared/service/create-reservation.service';
import { Reservation } from '../shared/model/reservation.model';
import { Notification } from '../shared/model/notification.model';
import { Role, User } from '../shared/model/user.model';
import { Building } from '../shared/model/building.model';
import { Floor } from '../shared/model/floor.model';
import { Wing } from '../shared/model/wing.model';
import { Location } from '../shared/model/location.model';
import { DefaultLocation } from '../shared/model/default-location.model';

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
  public upcomingReservations: Reservation[] = [];

  public favoriteLocation!: DefaultLocation;

  constructor(private notificationService: NotificationService, private createReservationService: CreateReservationService) {}

  ngOnInit(): void {
    this.getNotifications()
    this.getUpcomingReservations()
    this.getFavoriteLocation()
  }


  private getNotifications(): void {
    this.notifications = this.notificationService.getAllNotifications()
  }

  private getUpcomingReservations(): void {
    const building = new Building('testId', "De Entree 21 1101 BH", "Amsterdam");
    const floor = new Floor('testId', building, '4');
    const wing = new Wing('testId', floor, 'A');
    const user = new User('test@cgi.com', 'lastName', 'firstName', '0612345678', Role.USER);
    const location = new Location('testId', wing, 'A123', 'Meeting room', 6, false, new Date());

    this.upcomingReservations = [
      new Reservation('testId1', user, location, 'NOT_CHECKED_IN', new Date(), new Date(), 5, new Date()),
      new Reservation('testId2', user, location, 'NOT_CHECKED_IN', new Date(), new Date(), 5, new Date()),
      new Reservation('testId3', user, location, 'NOT_CHECKED_IN', new Date(), new Date(), 5, new Date()),

    ]
    // TODO: connect this to the ReservationService
  }

  private getFavoriteLocation(): void {
    this.favoriteLocation = this.createReservationService.getDefaultLocation();
  }

}
