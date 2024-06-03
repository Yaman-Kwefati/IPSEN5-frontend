import { Injectable } from '@angular/core';
import { ApiResponse, ApiService } from './api.service';
import { Building } from '../model/building.model';
import { Observable, catchError } from 'rxjs';
import { error } from 'cypress/types/jquery';
import { Wing } from '../model/wing.model';
import { Floor } from '../model/floor.model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteLocationService {
  constructor(private apiService: ApiService) {}

  public getBuildingList(): Observable<ApiResponse<Building[]>> {
    return this.apiService.get<ApiResponse<Building[]>>('/building').pipe(
      catchError((error) => {
        console.error('Error fetching building list: ', error);
        throw error;
      })
    );
  }

  public getWingList(buildingId: string): Observable<ApiResponse<Wing[]>> {
    return this.apiService
      .get<ApiResponse<Wing[]>>(`/building/${buildingId}/wing`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching wing list: ', error);
          throw error;
        })
      );
  }

  public getAllFloors(): Observable<ApiResponse<Floor[]>> {
    return this.apiService.get<ApiResponse<Floor[]>>('/floor').pipe(
      catchError((error) => {
        console.error('Error fetching floor list: ', error);
        throw error;
      })
    );
  }
}
