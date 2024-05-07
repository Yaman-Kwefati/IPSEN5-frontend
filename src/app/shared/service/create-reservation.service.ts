import { Injectable } from '@angular/core';
import { userPreferencesModel } from '../models/userpreferences.model';
import { locationsModel } from '../models/locations.model';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CreateReservationService {
  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {}

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
    }, 5000);

    // TODO: Implement this after the API is ready to handle this

    return;
  }

  public getReservations() {
    // TODO: Implement this after the API is ready to handle this
  }

  // Function to get user preferences from the API
  public getUserPrefs(): userPreferencesModel {
    return {
      favoriteLocation: 'Amsterdam',
      favoriteFloor: 5,
      favoriteWing: 'A',
      favoriteRoom: 'A1',
    };

    // TODO: Implement this after the API is ready to handle this
  }

  // Function to get all available locations from the API
  public getLocations(): locationsModel[] {
    return [
      {
        location: 'Amsterdam',
        address: 'De Entree 21',
        city: 'Amsterdam',
        zip: '1101 BH',
      },
      {
        location: 'Arnhem',
        address: 'Utrechtseweg 310 / gebouw B42',
        city: 'Arnhem',
        zip: '6812 AR',
      },
      {
        location: 'Eindhoven',
        address: 'High Tech Campus 5',
        city: 'Eindhoven',
        zip: '5656 AE',
      },
      {
        location: 'Groningen',
        address: 'Eemsgolaan 1',
        city: 'Groningen',
        zip: '9727 DW',
      },
      {
        location: 'Maastricht',
        address: 'Stationsplein 12',
        city: 'Maastricht',
        zip: '6221 BT',
      },
      {
        location: 'Rotterdam',
        address: 'George Hintzenweg 89',
        city: 'Rotterdam',
        zip: '3068 AX',
      },
    ];

    // TODO: Implement this after the API is ready to handle this
  }
}
