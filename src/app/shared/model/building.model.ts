
export class Building {
  private _id: string;
  private _address: string;
  private _name: string;
  private _isActive: boolean = false;

  constructor(id: string, address: string, name: string) {
    this._id = id;
    this._address = address;
    this._name = name;
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

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }


  get isActive(): boolean {
    return this._isActive;
  }

  set isActive(value: boolean) {
    this._isActive = value;
  }
}
