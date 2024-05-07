import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, DoCheck, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Notification } from '../../shared/models/notification.model';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [CommonModule, NotificationComponent, LucideAngularModule],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss'
})
export class InboxComponent implements AfterViewInit {
  @Input() notifications: Notification[] = [];
  @ViewChild('notificationContainer') notificationContainer: ElementRef | undefined;

  public showScrollArrow: boolean = true;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.onScroll();
    this.changeDetectorRef.detectChanges();
  }

  public onScroll(): void {
    const navContainer = this.notificationContainer?.nativeElement;
    const maxScroll = navContainer.scrollHeight - navContainer.clientHeight;

    if(navContainer.clientHeight < 500){
      this.showScrollArrow = false;
      return;
    }
    
    this.showScrollArrow = navContainer.scrollTop < maxScroll - 10;
  }

}
