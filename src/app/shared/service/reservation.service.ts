import {Injectable} from "@angular/core";
import {Reservation} from "../model/reservation.model";
import { Building } from "../model/building.model";
import { Floor } from "../model/floor.model";
import { Wing } from "../model/wing.model";
import { User } from "../model/user.model";
import { Location } from "../model/location.model";
import {Role} from "../model/role";
import {ApiResponse, ApiService} from "./api.service";
import {string} from "zod";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class ReservationService {
    constructor(private apiService: ApiService, private toastr: ToastrService) {
    }
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
  formatDate(date: Date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  makeReservation(reservation:{
    wingId: string,
    startDateTime: Date,
    endDateTime: Date, }){
    return this.apiService.post<ApiResponse<any>>('/reservations/reserve-workplace', {
      body: {
        ...reservation,
        startDateTime: this.formatDate(reservation.startDateTime),
        endDateTime: this.formatDate(reservation.endDateTime)
      }
    });
  }
}
