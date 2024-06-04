import {Component, Input, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../shared/service/requests/user.service';
import { User } from '../../shared/model/user.model';
import { CommonModule, NgForOf } from '@angular/common';
import { SearchPipe } from '../../shared/pipe/searchItem.pipe';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import {FavoriteUserService} from "../../shared/service/favorite-user.service";

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
  @Input()
  public favoriteColleagues!: User[];

  public faHeart = faHeart;

  public searchText: string = '';
  public allUsers: User[] = [];
  public favoriteUsers: User[] = [];

  public favoriteListSelected: boolean = false;

  constructor(private userService: UserService, private favoriteUserService: FavoriteUserService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe((users) => {
      this.allUsers = users;
    });
  }

  public toggleFavorite(user: User): void {
    if (this.favoriteUsers.includes(user)) {
      this.favoriteUserService.removeFavoriteUser(user).subscribe(
        (response) => {
          this.favoriteUsers = this.favoriteUsers.filter((u) => u !== user);
        },
        (error) => {
          console.error('Error removing favorite colleague: ', error);
        }
      );
    } else {
      this.favoriteUserService.addFavoriteUser(user).then(
        (response) => {
          this.favoriteUsers.push(user);
        },
        (error) => {
          console.error('Error adding favorite colleague: ', error);
        }
      );

    }
  }
}
