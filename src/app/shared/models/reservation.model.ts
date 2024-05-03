import {Time} from "@angular/common";

export class ReservationModel{
  id: string;
  location: Location;
  type: string;
  startTime: Time;
  date: Date;

  constructor(id: string, location: Location, type: string, startTime: Time, date: Date){
    this.id = id;
    this.location = location;
    this.type = type;
    this.startTime = startTime;
    this.date = date;
  }

}
