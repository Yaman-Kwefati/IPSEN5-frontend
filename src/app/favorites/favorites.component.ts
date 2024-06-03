import { Component } from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {LucideAngularModule} from "lucide-angular";
import {RouterLink} from "@angular/router";
import {ColleguesComponent} from "./colleagues/colleagues.component";
import { BuildingComponent } from "./building/building.component";

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
export class FavoritesComponent {

}
