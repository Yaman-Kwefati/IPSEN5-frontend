export interface NoShowModel {
  employeeName: string,
  numberOfReservations: number,
  numberOfNoShows: number,
}

export class NoShow {
  private _employeeName: string;
  private _numberOfReservations: number;
  private _numberOfNoShows: number;

  constructor(employeeName: string, numberOfReservations: number, numberOfNoShows: number) {
    this._employeeName = employeeName;
    this._numberOfReservations = numberOfReservations;
    this._numberOfNoShows = numberOfNoShows;
  }

  get employeeName(): string {
    return this._employeeName;
  }

  set employeeName(value: string) {
    this._employeeName = value;
  }

  get numberOfReservations(): number {
    return this._numberOfReservations;
  }

  set numberOfReservations(value: number) {
    this._numberOfReservations = value;
  }

  get numberOfNoShows(): number {
    return this._numberOfNoShows;
  }

  set numberOfNoShows(value: number) {
    this._numberOfNoShows = value;
  }
}