import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Building } from '../model/building.model';
import { StandardLocation } from '../model/standard-location.model';
import { Floor } from '../model/floor.model';
import { Wing } from '../model/wing.model';
import { User } from '../model/user.model';
import { Role } from '../model/role';
import { Observable, catchError } from 'rxjs';
import { ApiResponse, ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CreateReservationService {
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private apiService: ApiService
  ) {}

  public createReservation(form: FormGroup) {
    if (form === null || form === undefined)
      return this.toastr.error('Er is geen formulier ingevuld!', 'Fout');
    if (form.invalid)
      return this.toastr.error(
        'Niet alle velden zijn correct ingevuld!',
        'Fout'
      );

    this.toastr.success('Reservering is aangemaakt!', 'Succes');

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1500);
    // TODO: Implement this after the API is ready to handle this

    return;
  }

  public getReservations() {
    // TODO: Implement this after the API is ready to handle this
  }

  public getDefaultLocation(): Observable<ApiResponse<Wing>> {
    return this.apiService
      .get<ApiResponse<Wing>>('/user/standard-location')
      .pipe(
        catchError((error) => {
          console.error('Error fetching favorite list: ', error);
          throw error;
        })
      );
  }

  // Function to get all available buildings from the API
  public getBuildings(): Building[] {
    return [
      // TODO: Implement this after the API is ready to handle this
      new Building('testId1', 'De Entree 21 1101 BH', 'Amsterdam'),
      new Building('testId2', 'Utrechtseweg 310 / gebouw B42 6812 AR', 'Arhem'),
      new Building('testId3', 'DHigh Tech Campus 5 5656 AE', 'Eindhoven'),
      new Building('testId4', 'Eemsgolaan 1 9727 DW', 'Groningen'),
      new Building('testId5', 'Stationsplein 12 6221 BT', 'Maastricht'),
      new Building('testId6', 'George Hintzenweg 89 3068 AX', 'Rotterdam'),
    ];
  }
}
