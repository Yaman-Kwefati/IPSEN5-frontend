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
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component'; // Importing NavbarComponent
import { AuthService } from "./shared/service/auth.service";
import { ApiService } from "./shared/service/api.service";
import { DatePipe } from '@angular/common';
import {ReservationService} from "./shared/service/reservation.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule.forRoot(routes),
    LucideAngularModule.pick(icons),
    MatDatepickerModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthService,
    ApiService,
    ReservationService,
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
