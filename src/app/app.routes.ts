import { Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { AppLayoutComponent } from "./app-layout/app-layout.component";
import { CreateReservationComponent } from './reservation/create/create.component';
import { LoginComponent } from "./login/login.component";
import { loginGuard } from "./shared/guard/login.guard";
import { AuthGuard } from "./shared/guard/auth.guard";

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard],
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'reservation/create',
        component: CreateReservationComponent
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];
