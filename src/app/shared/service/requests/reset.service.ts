import {Injectable} from "@angular/core";
import {HttpHeaders} from "@angular/common/http";
import {ApiService} from "../api.service";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ResetService {

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
            console.error(error);
            return false;
        }
    }
  public sendTokenEmail(email: string): string{

      const body: object = { email };
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.apiService.post('/user/reset-password', { headers, body }).subscribe(
          error => {
              return 'Gebruikersnaam is onbekend.';
          }
      );
      return 'Er is een link naar de opgegeven email verstuurd.';
  }

}
