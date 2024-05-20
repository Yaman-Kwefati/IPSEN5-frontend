import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../shared/service/api.service';
import { HttpHeaders } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";

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
    if (this.validateFormValues()) {
      this.doApiRequest();
    }
  }

  private validateFormValues(): boolean {
    this.isUsernameInvalid = !this.username;
    this.isUsernameRepeatInvalid = !this.usernameRepeat;

    if (!this.username || !this.usernameRepeat) {
      this.toastr.error('Vul de gebruikersnaam in.');
      return false;
    }
    if (!this.checkIfMatching()) {
      this.isUsernameRepeatInvalid = true;
      this.toastr.error('Gebruikersnamen komen niet overeen.');
      return false;
    }
    return true;
  }

  private doApiRequest() {
    const email = this.username?.toLowerCase();
    if (!email) {
      this.toastr.error('Gebruikersnaam is onbekend.');
      return;
    }

    const body: object = { email };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.apiService.post('/user/reset-password', { headers, body }).subscribe(
      response => {
        this.toastr.success('Er is een link naar de opgegeven email verstuurd.');
      },
      error => {
        this.toastr.error('Gebruikersnaam is onbekend.');
      }
    );
  }

  private checkIfMatching(): boolean {
    return this.username?.toLowerCase() === this.usernameRepeat?.toLowerCase();
  }
}
