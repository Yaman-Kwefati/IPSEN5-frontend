import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import {AuthService} from "../shared/service/auth.service";


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  public search: boolean = false;

  constructor(private authService: AuthService, private router: Router,) {}

  signout() {
    this.authService.signout();
    this.router.navigate(["/login"])
  }

}
