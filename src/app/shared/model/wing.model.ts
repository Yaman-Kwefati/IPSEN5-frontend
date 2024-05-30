import {Floor} from "./floor.model";

export class Wing {
  private _id: string;
  private _floor: Floor;
  private _name: string;

  constructor(id: string, floor: Floor, name: string) {
    this._id = id;
    this._floor = floor;
    this._name = name;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get floor(): Floor {
    return this._floor;
  }

  set floor(value: Floor) {
    this._floor = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}
