import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ApiService } from "../../shared/service/api.service";
import { ToastrService } from "ngx-toastr";
import {HttpHeaders} from "@angular/common/http";
import {ResetService} from "../../shared/service/requests/reset.service";

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public token?: string;

  public username?: string;
  public password?: string;
  public passwordRepeat?: string;

  public isPasswordInvalid = false;
  public isPasswordRepeatInvalid = false;

  constructor(private route: ActivatedRoute,
              private apiService: ApiService,
              private resetService: ResetService,
              private toastr: ToastrService) {}

  ngOnInit() {
    const token = this.route.snapshot.paramMap.get('token');
    if (token) {
      this.token = token;
      const body: object = { token: this.token.toLowerCase() };
      this.apiService.post('/validate-token', body).subscribe(
          response => {
            this.toastr.success('Token is valid');
          },
          error => {
            this.toastr.error('Invalid token');
            //todo route back to request page
          }
      );
    } else {
      this.toastr.error('No token found in URL');
      //todo route back to request page
    }
  }

  onSubmit() {
    this.validateFormValues()
    if (this.password) {
      this.changePassword(this.password);
    }
  }

  private validateFormValues(){
    this.isPasswordInvalid = !this.password;
    this.isPasswordRepeatInvalid = !this.passwordRepeat;

    if (!this.password || !this.passwordRepeat) {
      this.toastr.error('Vul het wachtwoord in.');
      return ;
    }
    if (!this.checkIfMatching()) {
      this.isPasswordRepeatInvalid = true;
      this.toastr.error('Wachtwoorden komen niet overeen.');
      return;
    }
  }

  private changePassword(password: string) {
    const email = this.username?.toLowerCase();
    if (!email || !this.token) {
      this.toastr.error('Onvolledige gegevens.');
      return;
    }

    const feedback = this.resetService.resetPassword(email, password, this.token);
    this.toastr.info(feedback);
  }

  private checkIfMatching(): boolean {
    return this.password === this.passwordRepeat;
  }
}
