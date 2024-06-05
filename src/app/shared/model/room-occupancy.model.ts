export class RoomOccupancy {
  private _room: string;
  private _numberOfUsages: number;
  private _date: Date;

  constructor(room: string, numberOfUsages: number, date: Date) {
    this._room = room;
    this._numberOfUsages = numberOfUsages;
    this._date = date;
  }

  get room(): string {
    return this._room;
  }

  set room(value: string) {
    this._room = value;
  }

  get numberOfUsages(): number {
    return this._numberOfUsages;
  }

  set numberOfUsages(value: number) {
    this._numberOfUsages = value;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }

}

