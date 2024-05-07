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
      numberOfPeople: [0, Validators.required],
      type: ['werkplek', Validators.required],
      wing: ['', Validators.required],
      room: ['', Validators.required],
      date: [new Date(), [Validators.required, Validators.min(parseInt(new Date().toISOString().split('T')[0]))]],
      time: [new Date().getTime(), [Validators.required, Validators.min(parseInt(new Date().toISOString().split('T')[1]))]],
    });
  }


  userPrefs: userPreferencesModel = this.createReservationService.getUserPrefs();
  locations: locationsModel[] = this.createReservationService.getLocations();

  selectedLocation: string = this.userPrefs.favoriteLocation;
  selectedType!: string;

  wizardStep: number = 0;
  wizardSteps: string[] = ['Gebouw', 'Type', 'Datum & Tijd', 'Locatie', 'Overzicht'];

  nextWizardStep() {
    this.wizardStep++;
  }

  returnWizardStep() {
    this.wizardStep--;
  }

  submitReservation() {
    this.createReservationService.createReservation(this.reservationForm.value);
  }
}
