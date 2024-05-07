import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateReservationComponent } from './create.component'; 

@NgModule({
  declarations: [
    CreateReservationComponent 
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule
  ],
  exports: [
    CreateReservationComponent 
  ]
})
export class CreateReservationModule { }
