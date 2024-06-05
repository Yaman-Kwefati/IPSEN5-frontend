import {Location} from './location.model';

export class Property {
  private _id: string;
  private _location: Location;
  private _description: string;

  constructor(id: string, location: Location, description: string) {
    this._id = id;
    this._location = location;
    this._description = description;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get location(): Location {
    return this._location;
  }

  set location(value: Location) {
    this._location = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }
}
