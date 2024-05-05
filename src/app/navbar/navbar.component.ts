import { Component, HostListener } from '@angular/core';
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
export class NavbarComponent {
  public collapsed: boolean = true;

  constructor(private authService: AuthService) {}

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if(window.innerWidth <= 768){
      this.collapsed = true;
    }
  }

  toggleCollapse(): void{
    this.collapsed = !this.collapsed;
  }

  signout(): void {
    this.authService.signout();
  }
}
