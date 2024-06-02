import { Component, OnInit } from '@angular/core';
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
import { FavoriteColleaguesService } from '../../shared/service/favorite-colleagues.service';

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
  templateUrl: './building.component.html',
})
export class BuildingComponent implements OnInit {
  public faChevronDown = faChevronDown;

  public favoriteLocationForm!: FormGroup;

  public buildingList!: Building[];
  public wingList!: Wing[];
  public filteredWingList!: Wing[];
  public floorList!: Floor[];

  constructor(
    private favoriteColleaguesService: FavoriteColleaguesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getBuildingInformation();
    this.initiateForm();
  }

  initiateForm() {
    this.favoriteLocationForm = this.formBuilder.group({
      building: [''],
      wing: [''],
      floor: [''],
    });

    this.favoriteLocationForm
      .get('building')
      ?.valueChanges.subscribe((value) => {
        this.getWingInformation(value);
      });

    this.favoriteLocationForm.get('wing')?.valueChanges.subscribe((value) => {
      this.getFloorInformation(
        value,
        this.favoriteLocationForm.get('building')?.value
      );
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
    for (let wing of this.wingList.filter((wing) => wing.name === wingName)) {
      console.log(wing);
      console.log(wing.floor);
      break;
    }
  }

  submitFavoritesForm() {
    console.log(this.favoriteLocationForm.value);
  }
}
