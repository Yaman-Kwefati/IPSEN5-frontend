import { Injectable } from '@angular/core';
import { userPreferencesModel } from '../models/userpreferences.model';
import { locationsModel } from '../models/locations.model';

@Injectable({
  providedIn: 'root',
})
export class CreateReservationService {
  constructor() {}

  public createReservation() {
    // TODO: Implement this after the API is ready to handle this
  }

  public getReservations() {
    // TODO: Implement this after the API is ready to handle this
  }

  // Function to get user preferences from the API
  public getUserPrefs(): userPreferencesModel {
    return {
      favoriteLocation: 'Amsterdam',
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
        zip: '1101 BH'
      },
      { 
        location: 'Arnhem',
        address: 'Utrechtseweg 310 / gebouw B42',
        city: 'Arnhem',
        zip: '6812 AR'
      },
      { 
        location: 'Eindhoven',
        address: 'High Tech Campus 5',
        city: 'Eindhoven',
        zip: '5656 AE'
      },
      { 
        location: 'Groningen',
        address: 'Eemsgolaan 1',
        city: 'Groningen',
        zip: '9727 DW'
      },
      { 
        location: 'Maastricht',
        address: 'Stationsplein 12',
        city: 'Maastricht',
        zip: '6221 BT'
      },
      { 
        location: 'Rotterdam',
        address: 'George Hintzenweg 89',
        city: 'Rotterdam',
        zip: '3068 AX'
      }
    ];

    // TODO: Implement this after the API is ready to handle this
  }
}
