import {Component, OnInit} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {RouterLink} from "@angular/router";
import {UserService} from "../../shared/service/requests/user.service";
import {User} from "../../shared/model/user.model";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-collegues',
  standalone: true,
  imports: [
    LucideAngularModule,
    RouterLink,
    NgForOf
  ],
  templateUrl: './collegues.component.html',
  styleUrl: './collegues.component.scss'
})
export class ColleguesComponent implements OnInit{
  public allUsers: User[] = []

  constructor(private userService: UserService){

  }
  ngOnInit(){
    this.userService.getAllUsers().subscribe(users => {
      this.allUsers = users;
    });
  }

}
