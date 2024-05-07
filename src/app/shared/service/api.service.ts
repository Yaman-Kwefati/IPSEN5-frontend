import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthService } from './auth.service';
import {Observable} from "rxjs";

enum Endpoint {
  LOGIN = '/login',
}

@Injectable({
  providedIn: 'root',
})export class ApiService {
    public static API_URL = 'http://localhost:8080/api/v1';

    constructor(private http: HttpClient, private authService: AuthService) {

    }

    // TODO: these methods aren't finished yet, actual implementation will be done after the API is ready
    public post<T>(path: string, options?: {headers?: HttpHeaders}, body?: object): Observable<T> {
        return this.http.post<T>(`${ApiService.API_URL}${path}`, body, {

        });
    }

  public put<T>(path: string, options?: {headers?: HttpHeaders}, body?: object): Observable<T> {
    return this.http.put<T>(`${ApiService.API_URL}${path}`, body, options);
  }

  public get<T>(path: string, options?: {headers?: HttpHeaders}): Observable<T> {
    return this.http.get<T>(`${ApiService.API_URL}${path}`, options);
  }

  public delete<T>(path: string, options?: {headers?: HttpHeaders}): Observable<T> {
    return this.http.delete<T>(`${ApiService.API_URL}${path}`, options);
  }

  public patch<T>(path: string, options?: {headers?: HttpHeaders}, body?: object): Observable<T> {
    return this.http.patch<T>(`${ApiService.API_URL}${path}`, body, options);
  }




}
