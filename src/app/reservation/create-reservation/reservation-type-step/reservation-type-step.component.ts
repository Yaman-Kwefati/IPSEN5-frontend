import {Component, EventEmitter, Output} from '@angular/core';
import {ReservationType} from "../../../shared/model/reservering-type.enum";
import {MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";

@Component({
  selector: 'app-reservation-type-step',
  standalone: true,
  imports: [
    MatStepperNext,
    MatStepperPrevious
  ],
  templateUrl: './reservation-type-step.component.html',
  styleUrl: './reservation-type-step.component.scss'
})
export class ReservationTypeStepComponent {
    @Output() reservationType = new EventEmitter<ReservationType>();
    protected readonly ReservationType = ReservationType;
    protected selectedType!: ReservationType;

  protected setReservationType(type: ReservationType): void {
    this.selectedType = type;
    this.reservationType.emit(type);
    }
}
