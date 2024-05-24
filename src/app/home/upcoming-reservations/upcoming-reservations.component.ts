import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { ReservationModel } from '../../shared/models/reservation.model';
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
  reservations!: ReservationModel[];

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.getUpcomingReservations();
  }

  async getUpcomingReservations(): Promise<void> {
    let temp = await this.reservationService.getAllReservations();
    let now = new Date();

    console.log(temp);

    let upcomingReservations = temp.filter((reservation) => {
      let startDateTime = new Date(reservation.startDateTime);
      console.log(startDateTime);
      console.log("NOW: " + now);
      return startDateTime >= now;
    });

    console.log(upcomingReservations);
    
    this.reservations = upcomingReservations.sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime()).slice(0, 3);
  }
}
