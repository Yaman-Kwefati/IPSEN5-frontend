import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Reservation } from '../../shared/models/reservation.model';
import { ReservationService } from '../../shared/service/reservation.service';
import { C } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-upcoming-reservations',
  standalone: true,
  imports: [
    CommonModule, 
    LucideAngularModule,
    RouterModule
  ],
  templateUrl: './upcoming-reservations.component.html',
  styleUrl: './upcoming-reservations.component.scss'
})
export class UpcomingReservationsComponent {
  reservations!: Reservation[];

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.getUpcomingReservations();
  }

  async getUpcomingReservations(): Promise<void> {
    let temp = await this.reservationService.getAllReservations();
    let now = new Date();

    let upcomingReservations = temp.filter((reservation) => {
      let startDateTime = new Date(reservation.startDateTime);
      return startDateTime >= now;
    });
    
    this.reservations = upcomingReservations.sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime()).slice(0, 3);
  }
}
