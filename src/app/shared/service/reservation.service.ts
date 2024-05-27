import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation.model';
import { ApiService, ApiResponse } from './api.service';

@Injectable()
export class ReservationService {
  
    constructor(private apiService: ApiService) {
    const currentLocation = {
      location: 'Amsterdam',
      address: 'De Entree 21',
      city: 'Amsterdam',
      zip: '1101 BH',
    };
  }

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
