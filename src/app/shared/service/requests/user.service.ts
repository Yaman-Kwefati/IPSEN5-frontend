import {Injectable} from "@angular/core";
import {ApiService} from "../api.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Role, User} from "../../model/user.model";
import { z } from 'zod';
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";

// The schema for the response data
const RoleSchema = z.enum(['USER', 'ADMIN']);
const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  role: RoleSchema,
  phoneNumber: z.string()
});
const UsersResponseSchema = z.object({
  payload: z.array(UserSchema),
  message: z.string().nullable()
});


@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private apiService: ApiService, private toastr: ToastrService, private router: Router) {
  }


  public getAllUsers(): Observable<User[]> {
    let endpoint = '/user';

    return this.apiService.get<{ payload: User[]; message: string | null }>(endpoint)
      .pipe(
        map(response => {
          const parsed = UsersResponseSchema.parse(response);
          return parsed.payload.map(user => new User(
            user.email,
            user.lastname,
            user.firstname,
            user.phoneNumber,
            Role[user.role as keyof typeof Role],
            user.id
          ));
        }),
        catchError(error => {
          this.toastr.error('Failed to fetch users');
          console.error('Error fetching users:', error);
          return [];
        })
      );
  }

}


