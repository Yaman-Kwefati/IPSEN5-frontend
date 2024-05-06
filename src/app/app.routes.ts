import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AppLayoutComponent} from "./app-layout/app-layout.component";
import {ReservationDetailsComponent} from "./reservation-details/reservation-details.component";
import { CreateReservationComponent } from './reservation/create/create.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      // TODO add id of reservation in path
      {path: 'reservation/details',
      component: ReservationDetailsComponent
      },
      {
        path: 'reservation/create',
        component: CreateReservationComponent
      }
    ]
  },

];
