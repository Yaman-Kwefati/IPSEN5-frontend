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
import { User } from '../shared/model/user.model';
import { Building } from '../shared/model/building.model';
import { Floor } from '../shared/model/floor.model';
import { Wing } from '../shared/model/wing.model';
import { Location } from '../shared/model/location.model';
import { DefaultLocation } from '../shared/model/default-location.model';
import { UserService } from '../shared/service/user.service';
import {Role} from "../shared/model/role";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    InboxComponent, 
    UpcomingReservationsComponent,
    LucideAngularModule, 
    DefaultLocationComponent,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public notifications: Notification[] = [];
  public upcomingReservations: Reservation[] = [];
  public user!: User;

  public favoriteLocation!: DefaultLocation;

  constructor(private notificationService: NotificationService, private createReservationService: CreateReservationService, private userService: UserService) {}

  ngOnInit(): void {
    this.getNotifications()
    this.getFavoriteLocation()
    this.getUserInfo()
  }


  private getNotifications(): void {
    this.notifications = this.notificationService.getAllNotifications()
  }

  private getFavoriteLocation(): void {
    this.favoriteLocation = this.createReservationService.getDefaultLocation();
  }

  private async getUserInfo(): Promise<void> {
    this.user = await this.userService.getUserInfo();
  }

}
