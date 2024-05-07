import {Injectable} from "@angular/core";
import {ReservationModel} from "../models/reservation.model";
import {locationsModel} from "../models/locations.model";

@Injectable()
export class ReservationService {
    currentReservation: ReservationModel;

    constructor() {
        const currentLocation =  {
            location: 'Amsterdam',
            address: 'De Entree 21',
            city: 'Amsterdam',
            zip: '1101 BH',
        }
        this.currentReservation = new ReservationModel('testID', currentLocation, 'Z', 2, 'AMS2a',
            'Flexplek', new Date(2024, 4, 7, 11, 30));
    }

    getReservation(){
        //TODO get from API using id (add to param) instead of hardcoded
        return this.currentReservation;
    }
}
