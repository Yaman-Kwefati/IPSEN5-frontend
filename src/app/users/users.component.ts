import { Component } from '@angular/core';
import {UserService} from "../shared/service/requests/user.service";
import {User} from "../shared/model/user.model";
import {NgForOf} from "@angular/common";

@Component({
  selector: '' +
    'app-users',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  public users: User[] = []

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      console.log(this.users)
    });
  }

  onCreateClick() {

  }
}
