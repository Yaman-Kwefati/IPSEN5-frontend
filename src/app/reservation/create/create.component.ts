import { Component, NgModule, OnInit} from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';
import { CreateReservationService } from '../../shared/service/create-reservation.service';
import { userPreferencesModel } from '../../shared/models/userpreferences.model';
import { locationsModel } from '../../shared/models/locations.model';
import { Form, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CreateReservationModule } from './create.module';

@Component({
  selector: 'create-reservation',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})

export class CreateReservationComponent {
  reservationForm!: FormGroup;

  constructor(
    private createReservationService: CreateReservationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.reservationForm = this.formBuilder.group({
      location: [this.userPrefs.favoriteLocation, Validators.required],
      numberOfPeople: ['', Validators.required],
      type: ['', Validators.required],
      wing: ['', Validators.required],
      room: ['', Validators.required],
      date: ['', [Validators.required, Validators.min(parseInt(new Date().toISOString().split('T')[0]))]],
      time: ['', [Validators.required, Validators.min(parseInt(new Date().toISOString().split('T')[1]))]],
    });
  }


  userPrefs: userPreferencesModel = this.createReservationService.getUserPrefs();
  locations: locationsModel[] = this.createReservationService.getLocations();

  selectedLocation: string = this.userPrefs.favoriteLocation;
  selectedType!: string;

  wizardStep: number = 0;
  wizardSteps: string[] = ['Gebouw', 'Type', 'Locatie', 'Datum & Tijd', 'Overzicht'];

  nextWizardStep() {
    this.wizardStep++;
  }

  returnWizardStep() {
    this.wizardStep--;
  }

  submitReservation() {
    throw new Error('Method not implemented.');
  }
}
