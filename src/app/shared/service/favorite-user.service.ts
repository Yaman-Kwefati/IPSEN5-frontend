import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Role, User} from "../model/user.model";
import {catchError, map} from "rxjs/operators";
import {ApiResponse, ApiService} from "./api.service";
import {ToastrService} from "ngx-toastr";
import {HttpHeaders} from "@angular/common/http";


@Injectable({
  providedIn: 'root',
})
export class FavoriteUserService{

  constructor(private apiService: ApiService) {

  }

  public getIdOfFavoriteUsers(): Observable<ApiResponse<string[]>> {
        return this.apiService.get<ApiResponse<string[]>>('/user/favorite-colleagues').pipe(
      catchError((error) => {
        console.error('Error fetching favorite list: ', error);
        throw error;
      })
    );
  }


  public addFavoriteUser(user: User): Observable<ApiResponse<any>> {
    const body = { user };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.apiService.post<ApiResponse<any>>('/user/favorite-colleagues', { headers, body }).pipe(
      catchError((error) => {
        console.error('Error adding favorite user: ', error);
        throw error;
      })
    );
  }

  public removeFavoriteUser(user: User): Observable<ApiResponse<any>> {
    return this.apiService.delete<ApiResponse<any>>('/user/favorite-colleagues').pipe(
      catchError((error) => {
        console.error('Error fetching building list: ', error);
        throw error;
      })
    );
  }

}
