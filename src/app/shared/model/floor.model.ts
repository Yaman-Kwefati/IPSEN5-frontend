import {Building} from "./building.model";

export class Floor {
  private _id: string;
  private _building: Building;
  private _number: string;

  constructor(id: string, building: Building, number: string) {
    this._id = id;
    this._building = building;
    this._number = number;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get building(): Building {
    return this._building;
  }

  set building(value: Building) {
    this._building = value;
  }

  get number(): string {
    return this._number;
  }

  set number(value: string) {
    this._number = value;
  }
}
