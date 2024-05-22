import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import {ResetService} from "../../../shared/service/requests/reset.service";

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

  public isUsernameInvalid = false;

  constructor(private resetService: ResetService, private toastr: ToastrService) {}

  onSubmit() {
    if (this.validateFormValues()) {
      this.requestTokenEmail();
    }
  }

  private validateFormValues(): boolean {
    //todo refactor to formbuilder
    this.isUsernameInvalid = !this.username;

    if (!this.username) {
      this.toastr.error('Vul de gebruikersnaam in.');
      return false;
    }
    return true;
  }

  private requestTokenEmail() {
    const email = this.username?.toLowerCase();
    if (!email) {
      this.toastr.error('Gebruikersnaam is onbekend.');
      return;
    }else{
      const infoMessage = this.resetService.sendTokenEmail(email);
      this.toastr.info(infoMessage) ;
    }


  }
}
