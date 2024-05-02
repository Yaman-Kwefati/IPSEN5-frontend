import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username?: string;
  password?: string;

  constructor() { }

  onSubmit(): void {
    console.log('Username:', this.username, 'Password:', this.password);
  }
}
