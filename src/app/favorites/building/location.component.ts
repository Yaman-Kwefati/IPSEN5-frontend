import {Component, Input, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../shared/service/requests/user.service';
import { User } from '../../shared/model/user.model';
import { CommonModule, NgForOf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { SearchPipe } from '../../shared/pipe/searchItem.pipe';
import { Building } from '../../shared/model/building.model';
import { Wing } from '../../shared/model/wing.model';
import { Floor } from '../../shared/model/floor.model';
import { FavoriteLocationService } from '../../shared/service/favorite-location.service';
import {DefaultLocation} from "../../shared/model/default-location.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-building',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgForOf,
    FontAwesomeModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './location.component.html',
})
export class LocationComponent implements OnInit {
  @Input()
  public favoriteLocation!: Wing;

  public faChevronDown = faChevronDown;

  public favoriteLocationForm!: FormGroup;

  public buildingList!: Building[];
  public wingList!: Wing[];
  public filteredWingList!: Wing[];
  public floorList!: Floor[];

  constructor(
    private favoriteColleaguesService: FavoriteLocationService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getBuildingInformation();
    this.initiateForm();
  }

  initiateForm() {
    this.favoriteLocationForm = this.formBuilder.group({
      building: [this.favoriteLocation.floor.building.id || null, Validators.required],
      wing: [this.favoriteLocation.id || null, Validators.required],
      floor: [this.favoriteLocation.floor.id || null, Validators.required],
    });

    this.favoriteLocationForm
      .get('building')
      ?.valueChanges.subscribe((value) => {
        this.getWingInformation(value);
        this.favoriteLocationForm.get("wing")?.patchValue(null)
        this.favoriteLocationForm.get("floor")?.patchValue(null)
      });

    this.favoriteLocationForm.get('wing')?.valueChanges.subscribe((value) => {
      this.getFloorInformation(
        value,
        this.favoriteLocationForm.get('building')?.value
      );
      this.favoriteLocationForm.get("floor")?.patchValue(null)
    });
  }

  getBuildingInformation() {
    this.favoriteColleaguesService.getBuildingList().subscribe(
      (response) => {
        this.buildingList = response.payload;
      },
      (error) => {
        console.error('Error fetching building list: ', error);
      }
    );
  }

  getWingInformation(buildingId: string) {
    this.favoriteColleaguesService.getWingList(buildingId).subscribe(
      (response) => {
        this.wingList = response.payload;
        this.filterWingList(response.payload);
      },
      (error) => {
        console.error('Error fetching wing list: ', error);
      }
    );
  }

  filterWingList(wingList: Wing[]) {
    this.filteredWingList = wingList.filter(
      (wing, index, self) =>
        index === self.findIndex((t) => t.name === wing.name)
    );
  }

  getFloorInformation(wingName: string, buildingId: string) {
    let tempFilteredWingList = this.wingList.filter((wing) => wing.name === wingName)

    console.log(tempFilteredWingList)

    for (let i = 0; i < tempFilteredWingList.length; i++){
      let wing = tempFilteredWingList[i];
      console.log(wing.floor);
      this.floorList.push(wing.floor)
      break;
    }
  }

  submitFavoritesForm() {
    console.log(this.favoriteLocationForm.value);
  }
}
