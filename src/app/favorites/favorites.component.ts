import { Component } from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {LucideAngularModule} from "lucide-angular";
import {RouterLink} from "@angular/router";
import {ColleaguesComponent} from "./colleagues/colleagues.component";

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    DatePipe,
    LucideAngularModule,
    NgForOf,
    RouterLink,
    ColleaguesComponent
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {

}
