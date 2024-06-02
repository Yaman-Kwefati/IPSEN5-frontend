import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../shared/service/requests/user.service';
import { User } from '../../shared/model/user.model';
import { CommonModule, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { SearchPipe } from '../../shared/pipe/searchItem.pipe';

@Component({
  selector: 'app-building',
  standalone: true,
  imports: [FormsModule, RouterLink, NgForOf, FontAwesomeModule, CommonModule],
  templateUrl: './building.component.html',
})
export class BuildingComponent implements OnInit {
  faChevronDown = faChevronDown;

  constructor(private userService: UserService) {}

  ngOnInit() {
    console.log('BuildingComponent initiated');
  }
}