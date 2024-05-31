import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MatStepperModule} from "@angular/material/stepper";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {BuildingService} from "../../shared/service/building.service";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {NgClass} from "@angular/common";
import {Building} from "../../shared/model/building.model";


@Component({
  selector: 'app-create-reservation',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCard,
    MatCardImage,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    NgClass,
  ],
  templateUrl: './create-reservation.component.html',
  styleUrl: './create-reservation.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreateReservationComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  buildings!: Building[];
  isEditable = true;

  toggleActive(selectedBuilding: Building) {
    this.buildings.forEach(building => {
      building.isActive = false;
    });

    selectedBuilding.isActive = true;
  }

  constructor(private _formBuilder: FormBuilder,
              private buildingService: BuildingService) {
    this.buildingService.getBuildings().subscribe(
      data => {
        this.buildings = data.payload;
        console.log(this.buildings);
      }
    )
  }
  onSwiper(swiper: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
}
