import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {ApiService} from "../api.service";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {

  constructor(private apiService: ApiService) {
  }

    public async resetPassword(email: string, password: string, token: string): Promise<boolean> {
        const body = {
            email,
            password,
            token
        };

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        try {
            const response = await lastValueFrom(this.apiService.put('/user/reset-password', { headers, body }));
            return true;
        } catch (error) {
            this.handleError(error);
            return false;
        }
    }

    public sendTokenEmail(email: string): Promise<string> {
        const body = { email };
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.apiService.post('/user/reset-password', { headers, body }).toPromise()
            .then(() => 'Er is een link naar de opgegeven email verstuurd.')
            .catch(error => this.handleError(error));
    }

    private handleError(error: any): Promise<string> {
        if (error instanceof HttpErrorResponse && error.status === 500) {
            // Server error
            return Promise.resolve('Server error. Please wait a few minutes and try again.');
        } else {
            // Other errors (including network issues)
            return Promise.resolve('Er is een link naar de opgegeven email verstuurd.'); // Default message to maintain security
        }
    }

}
