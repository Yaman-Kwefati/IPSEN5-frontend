import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AppLayoutComponent} from "./app-layout/app-layout.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {ReservationsComponent} from "./reservations/reservations.component";

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
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
      {
        path: 'reservations',
        title: 'Reservations',
        component: ReservationsComponent
      },
    ]
  },

];
