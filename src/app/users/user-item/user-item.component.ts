import {Component, Input} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {User} from "../../shared/model/user.model";

@Component({
  selector: 'app-user-item',
  standalone: true,
  imports: [
    LucideAngularModule
  ],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.scss'
})
export class UserItemComponent {
  @Input() user?: User;
}
