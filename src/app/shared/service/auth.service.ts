import {Injectable} from "@angular/core";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";

@Injectable()
export class AuthService {
  constructor(private toastr: ToastrService, private router: Router, private http: HttpClient) {}


  parseToken = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64));

    return JSON.parse(jsonPayload);
  };

  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    if (!token) return false;

    return true;
  }

  public isAdmin(): boolean {
    // Implement after the API is ready to handle this
    return true;
  }

  public setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  public getToken() {
    return sessionStorage.getItem('token');
  }

  public validateToken(): void {
    // Implement this after the API is ready to handle this
  }

  public isLoggedIn(): boolean {
    const token = sessionStorage.getItem('token');
    return !!token;
  }

  public signout(): void {
    sessionStorage.removeItem('token');

    // Redirect to the login page
  }

  public getId() {
    const token = sessionStorage.getItem('token');
    if (!token) return '';

    try {
      // Split the token into parts
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT token');
      }
      const payload = parts[1];
      const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      const payloadObj = JSON.parse(decodedPayload);
      return payloadObj.sub;
    }
    catch (error) {
      console.error('Failed to decode JWT:', error);
      return null;
    }

  }

}
