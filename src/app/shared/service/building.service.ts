import {Injectable} from "@angular/core";
import {ApiResponse, ApiService} from "./api.service";
import {Building} from "../model/building.model";

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  constructor(private apiService: ApiService) {
  }

  public getBuildings() {
    return this.apiService.get<ApiResponse<Building[]>>(`/building`);
  }
}
