import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ApiService} from "../../shared/service/api.service";

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit{
  public token?: string;

  public username?: string;
  public password?: string;
  public passwordRepeat?: string;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    const token = this.route.snapshot.paramMap.get('token');
    if (token) {
      this.token = token;
      const body: object = { token: this.token.toLowerCase() };
      this.apiService.post('/validate-token', body).subscribe(
        response => {
          console.log('Token is valid', response);
          //TODO replace console logs for feedback + error handling
        },
        error => {
          console.error('Invalid token', error);
        }
      );
    } else {
      console.error('No token found in URL');
    }
  }

  onSubmit(){
// todo
  }
}
