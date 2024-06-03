import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {LucideAngularModule} from "lucide-angular";
import {RouterLink} from "@angular/router";
import {ColleguesComponent} from "./colleagues/colleagues.component";
import { LocationComponent } from "./building/location.component";
import { User } from "../shared/model/user.model"
import { Building } from "../shared/model/building.model"
import {FavoriteUserService} from "../shared/service/favorite-user.service";
import {FavoriteLocationService} from "../shared/service/favorite-location.service";
import {DefaultLocation} from "../shared/model/default-location.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    DatePipe,
    LucideAngularModule,
    NgForOf,
    RouterLink,
    ColleguesComponent,
    LocationComponent
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})

export class FavoritesComponent implements OnInit {
  favoriteColleaguesList!: User[];
  favoriteBuildingList!: DefaultLocation;

  constructor(private favoriteUserService: FavoriteUserService, private favoriteLocationService: FavoriteLocationService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getFavoriteColleagues();
    this.getFavoriteBuilding();
  }

  getFavoriteColleagues(): void {
    // TODO!: Get all the colleagues from the backend
    this.favoriteUserService.getAllFavoriteUsers().subscribe(
      (response) => {
        this.favoriteColleaguesList = response.payload;
      },
      (error) => {
        this.toastr.error("Probeer het later nog een keer", "Fout bij ophalen van favoriete collega's")
      }
    );
  }

  getFavoriteBuilding(): void {
    // TODO!: Get the favorite building from the backend
    this.favoriteLocationService.getStandardLocation().subscribe(
      (response) => {
        this.favoriteBuildingList = response.payload;
      },
      (error) => {
        this.toastr.error("Probeer het later nog een keer", "Fout bij ophalen van favoriete locatie")
      }
    );
  }

}
