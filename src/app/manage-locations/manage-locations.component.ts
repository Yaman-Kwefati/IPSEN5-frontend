import { Component, OnInit } from '@angular/core';
import { LocationComponent } from "./location/location.component";
import { LocationService } from '../shared/service/location.service';
import { ApiResponse, ApiService, Endpoint } from '../shared/service/api.service';
import { CommonModule } from '@angular/common';
import { Location } from '../shared/model/location.model';
import { FormsModule } from '@angular/forms';
import { Building } from '../shared/model/building.model';
import { LucideAngularModule } from 'lucide-angular';
import { Observable, catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-manage-locations',
    standalone: true,
    templateUrl: './manage-locations.component.html',
    styleUrl: './manage-locations.component.scss',
    imports: [LocationComponent, CommonModule, FormsModule, LucideAngularModule]
})
export class ManageLocationsComponent implements OnInit{
    public locations: Location[] = [];
    public searchQuery: string = '';
    public filteredLocations: Location[] = [];
    public buildings: Building[] = [];
    public selectedBuilding!: Building;

    constructor(private locationService: LocationService, private apiService: ApiService, private toastr: ToastrService) {}

    ngOnInit(): void {
        this.getBuildings();
    }

    public getBuildings(): void {
        this.getAllBuildings()
        .subscribe((response: ApiResponse<Building[]>) => {
            this.buildings = response.payload;
            this.selectedBuilding = this.buildings[0];
            this.getLocationsByBuilding();
        })
    }

    private getLocationsByBuilding(): void {
        this.locationService.getLocationsByBuilding(this.selectedBuilding)
        .subscribe((response: ApiResponse<Location[]>) => {
            this.locations = response.payload;
        })
    }

    public filterItemsBySearch(): void {

    }

    public onChangeFilter(): void {
        this.getLocationsByBuilding();
    }


    // TODO: put this in buildingService
    public getAllBuildings(): Observable<ApiResponse<Building[]>> {
        return this.apiService.get<ApiResponse<Building[]>>(Endpoint.BUILDING)
        .pipe(
          catchError((error) => {
            this.toastr.error('Er is iets misgegaan bij het ophalen van de data', 'Error');
            throw error;
          })
        );
      }

}
