import {Time} from "@angular/common";
import {locationsModel} from "./locations.model";

export class Reservation {
    id: string;
    user: {
        id: string,
        username: string,
        password: string,
        lastName: string,
        firstName: string,
        phoneNumber: string,
        role: string,
        enabled: boolean,
        credentialsNonExpired: boolean,
        authorities: [
            {
                authority: string
            }
        ],
        accountNonExpired: boolean,
        accountNonLocked: boolean
    };
    location: locationsModel;
    status: string;
    startDateTime: Date;
    endDateTime: Date;
    numberOfPeople: number;
    createdAt: Date;

    constructor(id: string, user: { id: string; username: string; password: string; lastName: string; firstName: string; phoneNumber: string; role: string; enabled: boolean; credentialsNonExpired: boolean; authorities: [{ authority: string }]; accountNonExpired: boolean; accountNonLocked: boolean }, location: locationsModel, status: string, startDateTime: Date, endDateTime: Date, numberOfPeople: number, createdAt: Date) {
        this.id = id;
        this.user = user;
        this.location = location;
        this.status = status;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.numberOfPeople = numberOfPeople;
        this.createdAt = createdAt;
    }
}
