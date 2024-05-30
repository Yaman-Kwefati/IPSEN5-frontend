import { Injectable } from "@angular/core";
import { ReservationService } from "./reservation.service";
import { Reservation } from "../model/reservation.model";
import { User } from "../model/user.model";

@Injectable()
export class UserService {
  constructor(private reservationService: ReservationService) {}

  async getUserInfo(): Promise<User> {
    const fullReservationInfo: Reservation[] = await this.reservationService.getAllReservations();  
    const user: User = fullReservationInfo[0].user;

    return user;
  }
}