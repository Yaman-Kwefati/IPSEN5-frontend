import { Component, Input, Output, EventEmitter} from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'create-reservation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})

export class CreateReservationComponent {

  @Input() showModal: boolean = false;
  @Output() disableModal = new EventEmitter<boolean>();

  toggleModal() {
    this.showModal = !this.showModal;
    this.disableModal.emit(false);
  }


  userPrefs = {
    favoriteLocation: 'Amsterdam',
    favoriteWing: 'A',
    favoriteRoom: 'A1',
  }

  locations: string[] = ['Amsterdam', 'Berlin', 'London', 'New York', 'Paris'];
  
}
