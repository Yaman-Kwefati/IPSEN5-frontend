import {Injectable} from "@angular/core";
import {ApiResponse, ApiService} from "./api.service";
import {Wing} from "../model/wing.model";

@Injectable({
  providedIn: 'root'
})
export class WingService{
  constructor(private apiService: ApiService) {
  }

  public getWingsByFloorId(floorId: string) {
    return this.apiService.get<ApiResponse<Wing[]>>(`/wing/floor/${floorId}`);
  }
}
