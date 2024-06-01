import { Component } from '@angular/core';
import {UserService} from "../shared/service/requests/user.service";
import {User} from "../shared/model/user.model";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: '' +
    'app-users',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  public users: User[] = []
  public usersToShow: User[] = []
  public searchInput: String = '';


  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      this.usersToShow = users;
      console.log(this.users)
    });
  }

  public onCreateClick() {

  }

  public onInputEdit(event: any) {
    this.searchInput = event;

    if (this.searchInput === '') {
      this.usersToShow = this.users;
      return
    }

    this.usersToShow = this.users.filter(user => {
      let fullName = user.firstName.toLowerCase() + " " + user.lastName.toLowerCase();
      let phone = user.phoneNumber.toLowerCase();
      let search = this.searchInput.toLowerCase();
      return user.email.toLowerCase().includes(search) || fullName.includes(search) || phone.includes(search)
    });


  }



}
