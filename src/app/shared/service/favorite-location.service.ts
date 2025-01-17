import { Injectable } from '@angular/core';
import { ApiResponse, ApiService } from './api.service';
import { Building } from '../model/building.model';
import {Observable, catchError, Subscription} from 'rxjs';
import { error } from 'cypress/types/jquery';
import { Wing } from '../model/wing.model';
import { Floor } from '../model/floor.model';
import {StandardLocation} from "../model/standard-location.model";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class FavoriteLocationService {
  constructor(private apiService: ApiService) {}

  public getStandardLocation(): Observable<ApiResponse<Wing>> {
    return this.apiService.get<ApiResponse<Wing>>('/user/standard-location').pipe(
      catchError((error) => {
        console.error('Error fetching standard location: ', error);
        throw error;
      })
    );
  }

  public saveStandardLocation(wingId: any): Observable<ApiResponse<any>> {
      const body = { wingId };
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      return this.apiService.put<ApiResponse<any>>('/user/standard-location', { headers, body }).pipe(
          catchError((error) => {
              console.error('Error saving standard location: ', error);
              throw error;
          })
      );
  }

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
