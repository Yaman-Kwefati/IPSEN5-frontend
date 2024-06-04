import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { Location, LocationType } from '../../shared/model/location.model';
import { Building } from '../../shared/model/building.model';
import { Observable, catchError } from 'rxjs';
import { ApiResponse, ApiService, Endpoint } from '../../shared/service/api.service';
import { Wing } from '../../shared/model/wing.model';
import { ToastrService } from 'ngx-toastr';
import { LocationService } from '../../shared/service/location.service';

@Component({
  selector: 'app-create-location',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, LucideAngularModule],
  templateUrl: './create-location.component.html',
  styleUrl: './create-location.component.scss'
})
export class CreateLocationComponent implements OnInit {
  @Input() buildings: Building[] = [];
  @Output() exitCreateMode = new EventEmitter<void>();
  public locationCreateForm!: FormGroup;
  public selectedBuilding: Building = this.buildings[0];
  public wings: Wing[] = [];
  public locationTypes: LocationType[] = [
    LocationType.FLEXPLEK,
    LocationType.LOKAAL
  ]

  constructor(private locationService: LocationService, private apiService: ApiService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getWings(this.buildings[0]);
    this.locationCreateForm = new FormGroup({
      'locationName': new FormControl(null, Validators.required),
      'locationType': new FormControl(this.locationTypes[0], Validators.required),
      'wing': new FormControl(this.wings[0], Validators.required),
      'building': new FormControl(this.buildings[0]),
      'capacity': new FormControl(0, Validators.required)
    })
  }

  private getWings(building: Building): void {
    this.getWingsByBuildingId(building.id)
    .subscribe((response: ApiResponse<Wing[]>) => {
      this.wings = response.payload;
      this.locationCreateForm.get('wing')?.setValue(this.wings[0]);
    });
  }

  // TODO: put this in wingservice
  private getWingsByBuildingId(id: string): Observable<ApiResponse<Wing[]>> {
    return this.apiService.get<ApiResponse<Wing[]>>(Endpoint.BUILDING+ "/"+ id + "/wing")
    .pipe(
      catchError((error) => {
        this.toastr.error('Er is iets misgegaan bij het ophalen van de vleugels', 'Error');
        throw error;
      })
    )
  }

  public onChangeBuilding(): void {
    this.selectedBuilding = this.locationCreateForm.get('building')?.value
    this.getWings(this.locationCreateForm.get('building')?.value);
  }
  
  public onExitCreateMode(): void {
    this.exitCreateMode.emit();
  }

  public onSubmitForm(): void {
    if(this.locationCreateForm.invalid) {
      this.toastr.error('Vul alle velden in')
      return;
    }

    this.createLocation();
  }

  private createLocation(): void {
    const requestBody = {
      wing: this.locationCreateForm.get('wing')?.value,
      name: this.locationCreateForm.get('locationName')?.value,
      type: this.locationCreateForm.get('locationType')?.value,
      capacity: this.locationCreateForm.get('capacity')?.value
    }

    this.locationService.createNewLocation(requestBody)
    .subscribe((response: ApiResponse<Location>) => {
      this.toastr.success('De nieuwe werkplek is opgeslagen', 'Succes')
      this.onExitCreateMode();
    })
  }
}
