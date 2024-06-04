import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Role, User} from "../model/user.model";
import {catchError, map} from "rxjs/operators";
import {ApiResponse, ApiService} from "./api.service";
import {ToastrService} from "ngx-toastr";
import {HttpHeaders} from "@angular/common/http";
import {UserService} from "./requests/user.service";


@Injectable({
  providedIn: 'root',
})
export class FavoriteUserService{


  constructor(private apiService: ApiService,
              private userService: UserService) {

  }

  public getFavoriteColleagues(): Observable<ApiResponse<User[]>> {
        return this.apiService.get<ApiResponse<User[]>>('/user/favorite-colleagues').pipe(
      catchError((error) => {
        console.error('Error fetching favorite list: ', error);
        throw error;
      })
    );
  }

  public addFavoriteUser(userToFavorite: User): Promise<string> {
    if(!userToFavorite.id){
        throw new Error('user cannot be added');
    }
    const id: string = userToFavorite.id
    const body = { id };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.apiService.post('/user/favorite-colleagues', { headers, body }).toPromise()
      .then(() => 'Favoriete collega is toegevoegd.')
      .catch(error => error.toString());
  }

  public removeFavoriteUser(user: User): Observable<ApiResponse<any>> {
    const body = { user };
    return this.apiService.delete<ApiResponse<any>>('/user/favorite-colleagues').pipe(
      catchError((error) => {
        console.error('Error fetching building list: ', error);
        throw error;
      })
    );
  }

}
