import { Injectable } from "@angular/core";
import { ApiResponse, ApiService, Endpoint } from "./api.service";
import { HttpParams } from "@angular/common/http";
import { Building } from "../model/building.model";
import { Observable, catchError } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { RoomOccupancy } from "../model/room-occupancy.model";
import { NoShow } from "../model/no-show.model";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(private apiService: ApiService, private toastr: ToastrService) {}

  public getRoomOccupancyData(buildingName: string, year: number ): Observable<ApiResponse<RoomOccupancy[]>> {
    let params = new HttpParams();

    params = params.set('buildingName', buildingName)
    params = params.set('year', year.toString())
    
    return this.apiService.get<ApiResponse<RoomOccupancy[]>>(Endpoint.REPORTS + '/occupancy', {params: params})
    .pipe(
      catchError((error) => {
        this.toastr.error('Er is iets misgegaan bij het ophalen van de data', 'Error');
        throw error;
      })
    );
  }

  public getNoShowData(buildingName: string, year: number): Observable<ApiResponse<NoShow[]>> {
    let params = new HttpParams();

    params = params.set('buildingName', buildingName)
    params = params.set('year', year.toString())

    return this.apiService.get<ApiResponse<NoShow[]>>(Endpoint.REPORTS + '/noshow', {params: params})
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