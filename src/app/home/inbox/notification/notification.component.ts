import { Component, Input } from '@angular/core';
import { Notification } from '../../../shared/models/notification.model';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  @Input() notification!: Notification;

  constructor(private toastr: ToastrService){}

  onRefuseRequest(): void {
    this.toastr.success('Je hebt het verzoek om van ruimte te wisselen afgewezen.', 'Success')
    // TODO: implementation of refusing request 

  }

  onAcceptRequest(): void {
    this.toastr.success('Je hebt het verzoek om van ruimte te wisselen geaccepteerd', 'Success')
    // TODO: implementation of accepting request
  }

}
