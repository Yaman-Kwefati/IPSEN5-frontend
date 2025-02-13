import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {User} from "../model/user.model";
import {catchError} from "rxjs/operators";
import {ApiResponse, ApiService} from "./api.service";


@Injectable({
    providedIn: 'root',
})
export class FavoriteUserService {

    constructor(private apiService: ApiService) {
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
        const body = this.createBodyOfFavoriteDto(userToFavorite);
        return this.apiService.post('/user/favorite-colleagues', { body }).toPromise()
            .then(() => 'Favoriete collega is toegevoegd.')
            .catch(error => error.toString());
    }

    public removeFavoriteUser(user: User): Observable<any> {
        const body = this.createBodyOfFavoriteDto(user);

        return this.apiService.put('/user/favorite-colleagues',
            {body}).pipe();
    }

    private createBodyOfFavoriteDto(user: User): { id: string } {
        if (!user.id) {
            console.error('cannot create body')
            throw new Error('user cannot be found');
        } else {
            const id: string = user.id
            return {id};
        }
    }

}
