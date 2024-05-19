import { Routes } from '@angular/router';
import {ReservationDetailsComponent} from "./reservation-details/reservation-details.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {ReservationsComponent} from "./reservations/reservations.component";
import { HomeComponent } from "./home/home.component";
import { AppLayoutComponent } from "./app-layout/app-layout.component";
import { CreateReservationComponent } from './reservation/create/create.component';
import { LoginComponent } from "./login/login.component";
import { loginGuard } from "./shared/guard/login.guard";
import { AuthGuard } from "./shared/guard/auth.guard";
import { ReportDashboardComponent } from './report-dashboard/report-dashboard.component';

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
        path: 'calendar',
        title: 'Calendar',
        component: CalendarComponent
      },
      
      // TODO add id of reservation in path
      {path: 'reservation/details',
      component: ReservationDetailsComponent
      },
      {
        path: 'reservations',
        title: 'Reservations',
        component: ReservationsComponent
      },
      {
        path: 'reservation/create',
        component: CreateReservationComponent
      },
      {
        path: 'reports',
        component: ReportDashboardComponent
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
