import { Component } from '@angular/core';
import {UserService} from "../shared/service/requests/user.service";
import {User} from "../shared/model/user.model";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  private users: User[] = []

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

}
