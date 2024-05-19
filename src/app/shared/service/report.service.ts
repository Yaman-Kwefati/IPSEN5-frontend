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
    {building: 'Amsterdam', room: 'A1', numberOfUsages: 35, date: new Date(2024, 5, 21)},
    {building: 'Amsterdam', room: 'A2', numberOfUsages: 37, date: new Date(2024, 6, 21)},
    {building: 'Amsterdam', room: 'A3', numberOfUsages: 39, date: new Date(2024, 2, 21)},
    {building: 'Amsterdam', room: 'A4', numberOfUsages: 92, date: new Date(2024, 9, 21)},
    {building: 'Amsterdam', room: 'A5', numberOfUsages: 37, date: new Date(2024, 3, 21)},
    {building: 'Amsterdam', room: 'A6', numberOfUsages: 93, date: new Date(2024, 0, 21)},
    {building: 'Amsterdam', room: 'A7', numberOfUsages: 75, date: new Date(2024, 11, 21)},
    {building: 'Amsterdam', room: 'A1', numberOfUsages: 43, date: new Date(2023, 5, 21)},
    {building: 'Amsterdam', room: 'A2', numberOfUsages: 18, date: new Date(2023, 2, 21)},
    {building: 'Amsterdam', room: 'A3', numberOfUsages: 65, date: new Date(2023, 9, 21)},
    {building: 'Amsterdam', room: 'A4', numberOfUsages: 36, date: new Date(2023, 4, 21)},
    {building: 'Amsterdam', room: 'A3', numberOfUsages: 38, date: new Date(2022, 2, 21)},
    {building: 'Amsterdam', room: 'A4', numberOfUsages: 93, date: new Date(2022, 6, 21)},
    {building: 'Rotterdam', room: 'A1', numberOfUsages: 35, date: new Date(2024, 11, 21)},
    {building: 'Rotterdam', room: 'A2', numberOfUsages: 28, date: new Date(2024, 8, 21)},
    {building: 'Rotterdam', room: 'A3', numberOfUsages: 49, date: new Date(2024, 3, 21)},
    {building: 'Rotterdam', room: 'A4', numberOfUsages: 82, date: new Date(2024, 4, 21)},
    {building: 'Rotterdam', room: 'A5', numberOfUsages: 36, date: new Date(2024, 2, 21)},
    {building: 'Rotterdam', room: 'A6', numberOfUsages: 11, date: new Date(2024, 8, 21)},
    {building: 'Rotterdam', room: 'A7', numberOfUsages: 92, date: new Date(2024, 6, 21)},
    {building: 'Rotterdam', room: 'A1', numberOfUsages: 29, date: new Date(2023, 3, 21)},
    {building: 'Rotterdam', room: 'A2', numberOfUsages: 93, date: new Date(2023, 11, 21)},
    {building: 'Rotterdam', room: 'A3', numberOfUsages: 73, date: new Date(2023, 9, 21)},
    {building: 'Rotterdam', room: 'A4', numberOfUsages: 75, date: new Date(2023, 7, 21)},
    {building: 'Rotterdam', room: 'A3', numberOfUsages: 54, date: new Date(2022, 2, 21)},
    {building: 'Rotterdam', room: 'A4', numberOfUsages: 33, date: new Date(2022, 5, 21)},
  ]



}