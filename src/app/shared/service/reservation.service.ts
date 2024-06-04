import { Injectable } from '@angular/core';
import { ApiService, ApiResponse } from './api.service';
import { Reservation } from '../model/reservation.model';
import { User } from '../model/user.model';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ReservationService {
  
    constructor(private apiService: ApiService, private toastr: ToastrService) {}

  getAllReservations(): Promise<Reservation[]> {
    return this.apiService.get<any>('/reservations/all')
      .toPromise()
      .then((response) => {
        return response.payload;
      })
      .catch((error) => {
        error.error ? this.toastr.error(error.error.message) : this.toastr.error('Fout bij het ophalen van reserveringen');
        return [];
      });
  }

  getReservationById(id: string): Promise<Reservation> {
    return this.apiService.get<any>(`/reservations/${id}`)
      .toPromise()
      .then((response) => {
        return response.payload;
      })
      .catch((error) => {
        error.error ? this.toastr.error(error.error.message) : this.toastr.error('Fout bij het ophalen van reservering');
        return [];
      });
  }
}
