import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Role, User} from "../model/user.model";
import {catchError, map} from "rxjs/operators";
import {ApiResponse, ApiService} from "./api.service";
import {ToastrService} from "ngx-toastr";


@Injectable({
  providedIn: 'root',
})
export class FavoriteUserService{

  constructor(private apiService: ApiService) {
  }

  public getAllFavoriteUsers(): Observable<ApiResponse<User[]>> {
    return this.apiService.get<ApiResponse<User[]>>('/user/favorite-colleagues').pipe(
      catchError((error) => {
        console.error('Error fetching building list: ', error);
        throw error;
      })
    );
  }

  public addFavoriteUser(user: User): Observable<ApiResponse<any>> {
    return this.apiService.post<ApiResponse<any>>('/user/favorite-colleagues').pipe(
      catchError((error) => {
        console.error('Error fetching building list: ', error);
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
