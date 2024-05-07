import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ApiService} from "../shared/service/api.service";
import {ToastrService} from "ngx-toastr";
import {LoginService} from "../shared/service/requests/login.service";

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
  public username?: string;
  public password?: string;

  constructor(private loginService: LoginService) {}

  onSubmit(): void {
    this.loginService.login(this.username!, this.password!);
  }
}
