import {Injectable} from "@angular/core";
import {ApiResponse, ApiService, Endpoint} from "./api.service";
import {Building} from "../model/building.model";
import { Observable, catchError } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  constructor(private apiService: ApiService, private toastr: ToastrService) {
  }

  public getBuildings() {
    return this.apiService.get<ApiResponse<Building[]>>(`/building`);
  }

  public getAllBuildings(): Observable<ApiResponse<Building[]>> {
    return this.apiService.get<ApiResponse<Building[]>>(Endpoint.BUILDING)
    .pipe(
      catchError((error) => {
        this.toastr.error('Er is iets misgegaan bij het ophalen van de data', 'Error');
        throw error;
      })
    );
  }
}
