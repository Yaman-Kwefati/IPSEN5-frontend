import {Injectable} from "@angular/core";
import {ApiService} from "../api.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private apiService: ApiService, private toastr: ToastrService, private router: Router) {
  }

  public login(username: string, password: string): void {
    // this.apiService.post('/auth/login', {}, {username, password})

    if (username === 'user' && password === 'hallo123') {
        this.toastr.success("Login succes", "Succes")
        this.router.navigate(["/home"])
    }
      else {
        this.toastr.error("Login failed", "Error")
      }
    localStorage.setItem('token', 'token');
  }

}
