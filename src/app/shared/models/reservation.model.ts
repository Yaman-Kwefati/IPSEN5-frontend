import {Time} from "@angular/common";
import {locationsModel} from "./locations.model";

export class ReservationModel {
    id: string;
    location: locationsModel;
    wing: string;
    floor: number;
    room: string;
    type: string;
    startTime: Time;
    date: Date;

    constructor(id: string, location: locationsModel, wing: string, floor: number, room: string,
                type: string, startTime: Time, date: Date) {
        this.id = id;
        this.location = location;
        this.wing = wing;
        this.floor = floor;
        this.room = room;
        this.type = type;
        this.startTime = startTime;
        this.date = date;
    }

}
