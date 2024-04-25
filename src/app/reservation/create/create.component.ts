import { Component, Input, Output, EventEmitter} from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';
import { CreateReservationService } from '../../shared/service/create-reservation.service';
import { userPreferencesModel } from '../../shared/models/userpreferences.model';
import { locationsModel } from '../../shared/models/locations.model';

@Component({
  selector: 'create-reservation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})

export class CreateReservationComponent {

  constructor(
    private createReservationService: CreateReservationService
  ) {}

  @Input() showModal: boolean = false;
  @Output() disableModal = new EventEmitter<boolean>();

  toggleModal() {
    this.showModal = !this.showModal;
    this.disableModal.emit(false);
  }

  userPrefs: userPreferencesModel = this.createReservationService.getUserPrefs();

  locations: locationsModel[] = this.createReservationService.getLocations();

  selectedLocation: string = this.userPrefs.favoriteLocation;
  selectedType!: string;

  wizardStep: number = 0;
  wizardSteps: string[] = ['Locatie', 'Type', 'Datum & Tijd', 'Overzicht', 'Bevestiging'];

  nextWizardStep() {
    this.wizardStep++;

    if (this.wizardStep === 4) {
      this.createReservationService.createReservation();
    }
  }

  returnWizardStep() {
    this.wizardStep--;
  }
}
