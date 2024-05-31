import { Component } from '@angular/core';
import { CreateReservationService } from '../../shared/service/create-reservation.service';
import { Form, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Building } from '../../shared/model/building.model';
import { DefaultLocation } from '../../shared/model/default-location.model';
import { NgModule, OnInit} from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';
import { CreateReservationModule } from './create.module';

@Component({
  selector: 'create-reservation',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})

export class CreateReservationComponent1 {
  reservationForm!: FormGroup;

  constructor(
    private createReservationService: CreateReservationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.reservationForm = this.formBuilder.group({
      location: [this.defaultLocation.wing.floor.building.name, Validators.required],
      numberOfPeople: [Validators.required, Validators.min(0)],
      type: ['werkplek', Validators.required],
      wing: ['', Validators.required],
      room: ['', Validators.required],
      date: [new Date(), [Validators.required, Validators.min(parseInt(new Date().toISOString().split('T')[0]))]],
      time: [new Date().getTime(), [Validators.required, Validators.min(parseInt(new Date().toISOString().split('T')[1]))]],
    });
  }

  defaultLocation: DefaultLocation = this.createReservationService.getDefaultLocation();
  buildings: Building[] = this.createReservationService.getBuildings();

  selectedLocation: string = this.defaultLocation.wing.floor.building.name;
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
