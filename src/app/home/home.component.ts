import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateReservationComponent } from '../reservation/create/create.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CreateReservationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  showModal: boolean = false;

  updateModal(showModal: boolean) {
    this.showModal = showModal;
    
  }
}
