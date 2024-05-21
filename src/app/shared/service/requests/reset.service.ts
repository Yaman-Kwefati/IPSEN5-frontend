import {Injectable} from "@angular/core";
import {HttpHeaders} from "@angular/common/http";
import {ApiService} from "../api.service";

@Injectable({
  providedIn: 'root',
})
export class ResetService {

  constructor(private apiService: ApiService) {
  }

  public resetPassword(email: string, password: string, token: string): string {

    const body: object = {
      email,
      password: password,
      token: token
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.apiService.put('/user/reset-password', { headers, body }).subscribe(
      response => {
        return 'Wachtwoord succesvol gewijzigd.'
      }
    );
    return 'Er is een fout opgetreden bij het wijzigen van het wachtwoord.'
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
