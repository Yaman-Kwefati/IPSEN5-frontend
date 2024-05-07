import { Component } from '@angular/core';
import {DeleteModalComponent} from "./delete-modal/delete-modal.component";

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [
    DeleteModalComponent
  ],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss'
})
export class ReservationsComponent {
  isDeleteModalVisible: boolean = false;

  openDeleteModal() {
    this.isDeleteModalVisible = !this.isDeleteModalVisible;
  }
}
