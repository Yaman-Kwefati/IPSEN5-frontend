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

@Injectable()
export class ReservationService {
    currentReservation!: Reservation;

    constructor(private apiService: ApiService) {
      const building = new Building('testId', "De Entree 21 1101 BH", "Amsterdam");
      const floor = new Floor('testId', building, '4');
      const wing = new Wing('testId', floor, 'A');
      const user = new User('test@cgi.com', 'lastName', 'firstName', '0612345678', Role.USER);
      const location = new Location('testId', wing, 'A123', 'Meeting room', 6, false, new Date());

      this.currentReservation = new Reservation('testId1', user, location, 'NOT_CHECKED_IN', new Date(), new Date(), 5, new Date())
    }

    getReservation(){
      //TODO get from API using id (add to param) instead of hardcoded
      return this.currentReservation;
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
