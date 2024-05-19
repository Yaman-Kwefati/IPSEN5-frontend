import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpParams } from "@angular/common/http";

export interface RoomOccupancyModel {
  building: string,
  room: string,
  numberOfUsages: number,
  date: Date,
}

export interface NoShowModel {
  employee: string,
  numberOfReservations: number,
  numberOfNoShows: number,
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private static PATH = "/reservation/report"

  constructor(private apiService: ApiService) {}

  public getRoomOccupancyData(location: string, year: number ): RoomOccupancyModel[] {
    let params = new HttpParams();

    if(location !== null && location !== undefined) {
      params = params.set('location', location)
    }

    if(year !== null) {
      params = params.set('year', year.toString())
    }
    
    // TODO: connect to the api (GET)
    return this.testData;
  }

  public getNoShowData(): NoShowModel[] {
    return this.noShowData;

  }

  private noShowData = [
    { employee: 'John Smith', numberOfReservations: 50, numberOfNoShows: 5},
    { employee: 'Jane Doe', numberOfReservations: 75, numberOfNoShows: 3},
    { employee: 'Alice Johnson', numberOfReservations: 60, numberOfNoShows: 6},
    { employee: 'Bob Brown', numberOfReservations: 80, numberOfNoShows: 4},
    { employee: 'Charlie White', numberOfReservations: 40, numberOfNoShows: 2},
  ]

  private testData = [
    {
      building: 'Amsterdam',
      room: 'A1',
      numberOfUsages: 35,
      date: new Date(2024, 5, 21)
    },
    {
      building: 'Amsterdam',
      room: 'A123',
      numberOfUsages: 35,
      date: new Date(2024, 5, 21)
    },
    {
      building: 'Amsterdam',
      room: 'A1234',
      numberOfUsages: 35,
      date: new Date(2024, 5, 21)
    },
    {
      building: 'Arnhem',
      room: 'B2',
      numberOfUsages: 42,
      date: new Date(2023, 3, 12)
    },
    {
      building: 'Eindhoven',
      room: 'C3',
      numberOfUsages: 28,
      date: new Date(2022, 10, 5)
    },
    {
      building: 'Groningen',
      room: 'D4',
      numberOfUsages: 15,
      date: new Date(2024, 7, 14)
    },
    {
      building: 'Maastricht',
      room: 'E5',
      numberOfUsages: 60,
      date: new Date(2022, 2, 25)
    },
    {
      building: 'Rotterdam',
      room: 'F6',
      numberOfUsages: 37,
      date: new Date(2023, 8, 19)
    },
    {
      building: 'Amsterdam',
      room: 'G7',
      numberOfUsages: 21,
      date: new Date(2024, 1, 2)
    },
    {
      building: 'Arnhem',
      room: 'H8',
      numberOfUsages: 50,
      date: new Date(2022, 6, 10)
    },
    {
      building: 'Eindhoven',
      room: 'I9',
      numberOfUsages: 33,
      date: new Date(2023, 11, 15)
    },
    {
      building: 'Groningen',
      room: 'J10',
      numberOfUsages: 47,
      date: new Date(2024, 4, 18)
    },
    {
      building: 'Maastricht',
      room: 'K11',
      numberOfUsages: 18,
      date: new Date(2022, 7, 14)
    },
    {
      building: 'Rotterdam',
      room: 'L12',
      numberOfUsages: 29,
      date: new Date(2023, 2, 20)
    },
    {
      building: 'Amsterdam',
      room: 'M13',
      numberOfUsages: 55,
      date: new Date(2024, 6, 8)
    },
    {
      building: 'Arnhem',
      room: 'N14',
      numberOfUsages: 32,
      date: new Date(2022, 9, 3)
    },
    {
      building: 'Eindhoven',
      room: 'O15',
      numberOfUsages: 24,
      date: new Date(2023, 1, 17)
    },
    {
      building: 'Groningen',
      room: 'P16',
      numberOfUsages: 38,
      date: new Date(2024, 3, 27)
    },
    {
      building: 'Maastricht',
      room: 'Q17',
      numberOfUsages: 41,
      date: new Date(2022, 11, 22)
    },
    {
      building: 'Rotterdam',
      room: 'R18',
      numberOfUsages: 26,
      date: new Date(2023, 5, 6)
    },
    {
      building: 'Amsterdam',
      room: 'S19',
      numberOfUsages: 49,
      date: new Date(2024, 8, 12)
    },
    {
      building: 'Arnhem',
      room: 'T20',
      numberOfUsages: 13,
      date: new Date(2022, 4, 1)
    },
    {
      building: 'Eindhoven',
      room: 'U21',
      numberOfUsages: 36,
      date: new Date(2023, 10, 29)
    },
    {
      building: 'Groningen',
      room: 'V22',
      numberOfUsages: 22,
      date: new Date(2024, 2, 11)
    },
    {
      building: 'Maastricht',
      room: 'W23',
      numberOfUsages: 30,
      date: new Date(2022, 8, 5)
    },
    {
      building: 'Rotterdam',
      room: 'X24',
      numberOfUsages: 44,
      date: new Date(2023, 6, 14)
    },
    {
      building: 'Amsterdam',
      room: 'Y25',
      numberOfUsages: 27,
      date: new Date(2024, 9, 18)
    },
    {
      building: 'Arnhem',
      room: 'Z26',
      numberOfUsages: 53,
      date: new Date(2022, 3, 7)
    },
    {
      building: 'Eindhoven',
      room: 'AA27',
      numberOfUsages: 20,
      date: new Date(2023, 11, 9)
    },
    {
      building: 'Groningen',
      room: 'BB28',
      numberOfUsages: 39,
      date: new Date(2024, 11, 16)
    },
    {
      building: 'Maastricht',
      room: 'CC29',
      numberOfUsages: 34,
      date: new Date(2022, 1, 23)
    },
    {
      building: 'Rotterdam',
      room: 'DD30',
      numberOfUsages: 25,
      date: new Date(2023, 7, 30)
    }
  ]



}