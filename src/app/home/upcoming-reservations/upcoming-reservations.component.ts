import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-upcoming-reservations',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './upcoming-reservations.component.html',
  styleUrl: './upcoming-reservations.component.scss'
})
export class UpcomingReservationsComponent {
  @Input() reservations: {
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

}
