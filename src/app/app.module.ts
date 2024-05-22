import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, icons } from 'lucide-angular';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ToastrModule } from 'ngx-toastr';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {FullCalendarModule} from "@fullcalendar/angular";
import { NavbarComponent } from './navbar/navbar.component'; // Importing NavbarComponent
import { AuthService } from "./shared/service/auth.service";
import { ApiService } from "./shared/service/api.service";
import { DatePipe } from '@angular/common';
import {ReservationService} from "./shared/service/reservation.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ResetPasswordService } from './shared/service/requests/reset-password.service';
import { NgxEchartsModule } from 'ngx-echarts';
import {MyInterceptor} from "./shared/service/requests/intetceptor";


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    LucideAngularModule.pick(icons),
    MatDatepickerModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FullCalendarModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy },
    {provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true},
    AuthService,
    ApiService,
    ResetPasswordService,
    ReservationService,
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
