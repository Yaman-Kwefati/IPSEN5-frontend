import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {ApiService} from "../api.service";


@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {

  constructor(private apiService: ApiService, private toastr: ToastrService) {

  }

  public resetPassword(email: string, password: string, token: string): void {
    const body = { email, password, token };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.apiService.put('/user/reset-password', { headers, body })
        .subscribe({
          next: (response) => {
            this.toastr.success('Wachtwoord succesvol gewijzigd.');
            // todo route
          },
          error: (error) => {
            this.toastr.error('Er is iets misgegaan. Controleer de gegevens of probeer het later opnieuw.')
          }
        });
  }

  public sendTokenEmail(email: string): void {
    const body = { email };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.apiService.post('/user/reset-password', { headers, body })
        .subscribe({
          next: () => {
            this.toastr.success('Er is een link naar het opgegeven emailadres verstuurd.');
          },
          error: (error) => {
            this.handleError(error).then(errorMessage => {
              this.toastr.error(errorMessage);
            });
          }
        });
  }

  private handleError(error: any): Promise<string> {
    if (error instanceof HttpErrorResponse && error.status === 500) {
      return Promise.resolve('Server error. Please wait a few minutes and try again.');
    } else {
      return Promise.resolve('Er is een link naar de opgegeven email verstuurd.');
    }
  }

}
