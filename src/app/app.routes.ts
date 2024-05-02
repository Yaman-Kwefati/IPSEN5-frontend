import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AppLayoutComponent} from "./app-layout/app-layout.component";
import {LoginComponent} from "./login/login.component";

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
        path: 'login',
        component: LoginComponent
      },

    ]
  },

];
