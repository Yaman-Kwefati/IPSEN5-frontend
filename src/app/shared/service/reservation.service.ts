import { Injectable } from '@angular/core';
import { ReservationModel } from '../models/reservation.model';
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

  getAllReservations(): Promise<ReservationModel[]> {
    return this.apiService.get<any>('/reservation/all')
      .toPromise()
      .then((response) => {
        return response.payload;
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  }

  getReservationById(id: string): Promise<ReservationModel> {
    return this.apiService.get<any>(`/reservation/${id}`)
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  }
}
