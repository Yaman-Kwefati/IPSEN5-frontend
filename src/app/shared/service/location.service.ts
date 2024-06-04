import { Injectable } from "@angular/core";
import { ApiResponse, ApiService, Endpoint } from "./api.service";
import { Observable, catchError } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { Location } from "../model/location.model";
import { Building } from "../model/building.model";
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private apiService: ApiService, private toastr: ToastrService){}

  public getAllLocations(): Observable<ApiResponse<Location[]>> {
    return this.apiService.get<ApiResponse<Location[]>>(Endpoint.LOCATION)
    .pipe(
      catchError((error) => {
        this.toastr.error('Er is iets misgegaan bij het ophalen van de data', 'Error');
        throw error;
      })
    )
  }

  public getLocationsByBuilding(building: Building): Observable<ApiResponse<Location[]>> {
    const buildingName = building.name;
    let params = new HttpParams;

    params = params.set('buildingName', buildingName);

    return this.apiService.get<ApiResponse<Location[]>>(Endpoint.LOCATION + "/admin", {params: params})
    .pipe(
      catchError((error) => {
        this.toastr.error('Er is iets misgegaan bij het ophalen van de data', 'Error');
        throw error;
      })
    )
  }
}
