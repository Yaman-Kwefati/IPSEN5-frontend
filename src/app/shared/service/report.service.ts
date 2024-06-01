import { Injectable } from "@angular/core";
import { ApiResponse, ApiService, Endpoint } from "./api.service";
import { HttpParams } from "@angular/common/http";
import { Building } from "../model/building.model";
import { Observable, catchError, throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";

export interface RoomOccupancyModel {
  room: string,
  numberOfUsages: number,
  date: Date,
}

export interface NoShowModel {
  employeeName: string,
  numberOfReservations: number,
  numberOfNoShows: number,
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(private apiService: ApiService, private toastr: ToastrService) {}

  public getRoomOccupancyData(buildingName: string, year: number ): Observable<ApiResponse<RoomOccupancyModel[]>> {
    let params = new HttpParams();

    params = params.set('buildingName', buildingName)
    params = params.set('year', year.toString())
    
    return this.apiService.get<ApiResponse<RoomOccupancyModel[]>>(Endpoint.REPORTS + '/occupancy', {params: params})
    .pipe(
      catchError((error) => {
        this.toastr.error('Er is iets misgegaan bij het ophalen van de data', 'Error');
        throw error;
      })
    );
  }

  public getNoShowData(buildingName: string, year: number): Observable<ApiResponse<NoShowModel[]>> {
    let params = new HttpParams();

    params = params.set('buildingName', buildingName)
    params = params.set('year', year.toString())

    return this.apiService.get<ApiResponse<NoShowModel[]>>(Endpoint.REPORTS + '/noshow', {params: params})
    .pipe(
      catchError((error) => {
        this.toastr.error('Er is iets misgegaan bij het ophalen van de data', 'Error');
        throw error;
      })
    );
  }

  public getBuildings(): Observable<ApiResponse<Building[]>> {
    return this.apiService.get<ApiResponse<Building[]>>("/building")
    .pipe(
      catchError((error) => {
        this.toastr.error('Er is iets misgegaan bij het ophalen van de data', 'Error');
        throw error;
      })
    );
  }
}