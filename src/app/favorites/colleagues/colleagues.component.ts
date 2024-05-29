import {Component, OnInit} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {RouterLink} from "@angular/router";
import {UserService} from "../../shared/service/requests/user.service";
import {User} from "../../shared/model/user.model";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-colleagues',
  standalone: true,
  imports: [
    LucideAngularModule,
    RouterLink,
    NgForOf
  ],
  templateUrl: './colleagues.component.html',
  styleUrl: './colleagues.component.scss'
})
export class ColleaguesComponent implements OnInit{
  public allUsers: User[] = []

  constructor(private userService: UserService){

  }
  ngOnInit(){
    this.userService.getAllUsers().subscribe(users => {
      this.allUsers = users;
    });
  }

}
