import { Injectable } from '@angular/core';
import { ApiService, ApiResponse } from './api.service';
import { Reservation } from '../model/reservation.model';
import { User } from '../model/user.model';

@Injectable()
export class ReservationService {
  
    constructor(private apiService: ApiService) {}

  getAllReservations(): Promise<Reservation[]> {
    return this.apiService.get<any>('/reservations/all')
      .toPromise()
      .then((response) => {
        return response.payload;
      })
      .catch((error) => {
        console.error(error);
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
        console.error(error);
        return [];
      });
  }
}
