import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../shared/service/api.service';
import {HttpHeaders} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './request-reset-password.component.html',
  styleUrls: ['./request-reset-password.component.scss']
})
export class RequestResetPasswordComponent {
  public username?: string;
  public usernameRepeat?: string;

  public isUsernameInvalid = false;
  public isUsernameRepeatInvalid = false;

  constructor(private apiService: ApiService, private toastr: ToastrService) {}

  onSubmit() {
    this.isUsernameInvalid = !this.username;
    this.isUsernameRepeatInvalid = !this.usernameRepeat;

    if (!this.username || !this.usernameRepeat) {
      this.toastr.error('Vul de gebruikersnaam in.');
      return;
    }
    if (!this.checkIfMatching()) {
      this.toastr.error('Gebruikersnamen komen niet overeen.');
      return;
    }
    const body: object = { email: this.username.toLowerCase() };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.apiService.post('/user/reset-password',{headers, body}).subscribe(
      response => {
        this.toastr.success('Er is een link naar de opgegeven email verstuurd.');
      }, error => {
        this.toastr.error('Gebruikersnaam is onbekend.');
      }
    );
  }

  private validateFormValues(){

  }

  private checkIfMatching(): boolean {
    return this.username?.toLowerCase() === this.usernameRepeat?.toLowerCase();
  }
}
