import {ApiResponse, ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {Floor} from "../model/floor.model";

@Injectable({
  providedIn: 'root'
})
export class FloorService{
  constructor(private apiService: ApiService) {
  }

  public getFloorsByBuildingId(buildingId: string) {
    return this.apiService.get<ApiResponse<Floor[]>>(`/floor/building/${buildingId}`);
  }
}
