import { Component, Input, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Location, LocationType } from '../../shared/model/location.model';
import { CommonModule, DatePipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocationService } from '../../shared/service/location.service';
import { Building } from '../../shared/model/building.model';
import { Wing } from '../../shared/model/wing.model';
import { ApiResponse } from '../../shared/service/api.service';
import { ToastrService } from 'ngx-toastr';
import { WingService } from '../../shared/service/wing.service';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [LucideAngularModule, DatePipe, CommonModule, FormsModule, ReactiveFormsModule, ],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent implements OnInit {
  @Input() location!: Location;
  public locationForm!: FormGroup;
  public wings: Wing[] = [];
  public locationTypes: LocationType[] = [
    LocationType.WORKPLACE,
    LocationType.ROOM
  ]

  constructor(private locationService: LocationService, private wingService: WingService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getWings();
    this.locationForm = new FormGroup({
      'locationName': new FormControl(this.location.name, Validators.required),
      'locationType': new FormControl(this.location.type, Validators.required),
      'wing': new FormControl(this.location.wing, Validators.required),
      'capacity': new FormControl(this.location.capacity, Validators.required)
    });
  }

  public onSubmitForm(): void {
    if(this.locationForm.invalid){
      this.toastr.error('Vul alle velden in');
      return;
    }

    this.editLocation()
  }

  private getWings(): void {
    const building: Building = this.location.wing.floor.building
    this.wingService.getWingsByBuildingId(building.id).subscribe((response: ApiResponse<Wing[]>) => {
      this.wings = response.payload;
    });
  }

  private editLocation(): void {
    const requestBody = {
      wing: this.locationForm.get('wing')?.value, 
      name: this.locationForm.get('locationName')?.value,
      type: this.locationForm.get('locationType')?.value,
      capacity: this.locationForm.get('capacity')?.value
    }

    this.locationService.updateLocation(this.location.id, requestBody)
    .subscribe((response: ApiResponse<Location>) => {
      this.location = response.payload;
      this.locationForm.get('wing')?.setValue(this.location.wing)
      this.location.isEdit = false;
      this.toastr.success('De werkplek is opgeslagen', 'Succes')
    })
  }
}
