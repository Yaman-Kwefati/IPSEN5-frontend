import {Injectable} from "@angular/core";
import {Reservation} from "../model/reservation.model";

@Injectable()
export class ReservationService {
    currentReservation!: Reservation;

    constructor() {
      const currentLocation =  {
        location: 'Amsterdam',
        address: 'De Entree 21',
        city: 'Amsterdam',
        zip: '1101 BH',
      }
    }

    getReservation(){
      //TODO get from API using id (add to param) instead of hardcoded
      return this.currentReservation;
    }
}
