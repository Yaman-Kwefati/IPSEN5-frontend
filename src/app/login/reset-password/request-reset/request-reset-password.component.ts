import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../shared/service/api.service';
import {HttpHeaders} from "@angular/common/http";

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

  constructor(private apiService: ApiService) {}

  onSubmit() {
    if (!this.username || !this.usernameRepeat) {
      console.error('Usernames cannot be empty');
      return;
    }
    if (!this.checkIfMatching()) {
      console.error('Usernames do not match');
      return;
    }
    const body: object = { email: this.username.toLowerCase() };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.apiService.post('/user/reset-password',{headers, body}).subscribe(
      response => {
        console.log('Request successful', response);
      }
    );
  }

  private checkIfMatching(): boolean {
    return this.username?.toLowerCase() === this.usernameRepeat?.toLowerCase();
  }
}
