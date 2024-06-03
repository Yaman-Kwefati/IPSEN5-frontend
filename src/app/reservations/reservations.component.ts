import {Component, OnInit} from '@angular/core';
import {DeleteModalComponent} from "./delete-modal/delete-modal.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {Reservation} from "../shared/model/reservation.model";
import {ReservationService} from "../shared/service/reservation.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [
    DeleteModalComponent,
    MatExpansionModule
  ],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss'
})
export class ReservationsComponent implements OnInit{
  protected isDeleteModalVisible: boolean = false;
  protected reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService,
              private toastr: ToastrService){
  }

  ngOnInit(): void {
    this.reservationService.getAllReservations2().subscribe(
      data => {
        this.reservations = data.payload;
        console.log(this.reservations);
      }, error => {
        if (error && (error as any).error) {
          this.toastr.error((error as any).error.message);
        } else {
          this.toastr.error('Fout bij het ophalen van reserveringen');
        }
      }
    );
  }

  protected getDate(dateToFormat: Date) {
    const date = new Date(dateToFormat);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  protected getTime(dateToFormat: Date) {
    const date = new Date(dateToFormat);
    return `${date.getHours()}:${date.getMinutes()}`;
  }

  protected openDeleteModal() {
    this.isDeleteModalVisible = !this.isDeleteModalVisible;
  }
}
