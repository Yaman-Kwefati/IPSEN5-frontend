import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../shared/service/requests/user.service';
import { User } from '../../shared/model/user.model';
import { CommonModule, NgForOf } from '@angular/common';
import { SearchPipe } from '../../shared/pipe/searchItem.pipe';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-collegues',
  standalone: true,
  imports: [
    SearchPipe,
    FormsModule,
    RouterLink,
    NgForOf,
    FontAwesomeModule,
    CommonModule,
  ],
  templateUrl: './colleagues.component.html',
  styleUrl: './colleagues.component.scss',
})
export class ColleguesComponent implements OnInit {
  faHeart = faHeart;

  public searchText: string = '';
  public allUsers: User[] = [];
  public favoriteUsers: User[] = [];

  public favoriteListSelected: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe((users) => {
      this.allUsers = users;
    });
  }

  toggleFavorite(user: User) {
    if (this.favoriteUsers.includes(user)) {
      this.favoriteUsers = this.favoriteUsers.filter((u) => u !== user);
    } else {
      this.favoriteUsers.push(user);
    }

    console.log(this.favoriteUsers);
  }
}