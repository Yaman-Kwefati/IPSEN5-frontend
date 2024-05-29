import { Component } from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {LucideAngularModule} from "lucide-angular";
import {RouterLink} from "@angular/router";
import {ColleguesComponent} from "./collegues/collegues.component";

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    DatePipe,
    LucideAngularModule,
    NgForOf,
    RouterLink,
    ColleguesComponent
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {

}
