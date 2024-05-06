import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ApiService} from "../shared/service/api.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username?: string;
  password?: string;

  constructor(private apiService: ApiService, private router: Router, private toastr: ToastrService) { }

  onSubmit(): void {
    // TODO: This is mock data and is only temporary
    if (this.username === 'user' && this.password === 'hallo123') {
      this.apiService.login(this.username, this.password);
      this.toastr.success("Login succes", "Succes")
      this.router.navigate(["/home"])
    }
    else {
      this.toastr.error("Login failed", "Error")
    }
  }
}
