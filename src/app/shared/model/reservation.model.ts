import {User} from "./user.model";
import {Location} from "./location.model";

export class Reservation {
  private _id: string;
  private _user: User;
  private _location: Location;
  private _status: string;
  private _startDateTime: Date;
  private _endDateTime: Date;
  private _numberOfPeople: number;
  private _createdAt: Date;

  constructor(id: string, user: User, location: Location, status: string, startDateTime: Date, endDateTime: Date, numberOfPeople: number, createdAt: Date) {
    this._id = id;
    this._user = user;
    this._location = location;
    this._status = status;
    this._startDateTime = startDateTime;
    this._endDateTime = endDateTime;
    this._numberOfPeople = numberOfPeople;
    this._createdAt = createdAt;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get location(): Location {
    return this._location;
  }

  set location(value: Location) {
    this._location = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  get startDateTime(): Date {
    return this._startDateTime;
  }

  set startDateTime(value: Date) {
    this._startDateTime = value;
  }

  get endDateTime(): Date {
    return this._endDateTime;
  }

  set endDateTime(value: Date) {
    this._endDateTime = value;
  }

  get numberOfPeople(): number {
    return this._numberOfPeople;
  }

  set numberOfPeople(value: number) {
    this._numberOfPeople = value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  toJSON() {
    return {
      wingId: this._location.wing.id,
    };
  }
}
