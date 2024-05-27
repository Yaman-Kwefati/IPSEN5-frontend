export class Building {
  private _id: string;
  private _address: string;

  constructor(id: string, address: string) {
    this._id = id;
    this._address = address;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }
}
