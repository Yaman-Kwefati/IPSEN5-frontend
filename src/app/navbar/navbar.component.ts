import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import {AuthService} from "../shared/service/auth.service";
import { NavbarItemComponent } from './navbar-item/navbar-item.component';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, NavbarItemComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent{
  collapsed = true;

  constructor(private authService: AuthService) {}

  toggleCollapse(){
    this.collapsed = !this.collapsed;
  }

  signout() {
    this.authService.signout();
  }
}
