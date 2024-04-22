import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})export class ApiService {
    public static API_URL = 'http://localhost:8080/api/v1';

    constructor(private http: HttpClient, private authService: AuthService) {
    }


}
