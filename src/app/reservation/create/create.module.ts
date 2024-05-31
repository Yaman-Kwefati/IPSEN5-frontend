import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateReservationComponent1 } from './create.component';

@NgModule({
  declarations: [
    CreateReservationComponent1
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CreateReservationComponent1
  ]
})
export class CreateReservationModule { }
