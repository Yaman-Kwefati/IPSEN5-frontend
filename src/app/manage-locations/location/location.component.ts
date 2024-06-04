import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Location } from '../../shared/model/location.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [LucideAngularModule, DatePipe],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {
  @Input() location!: Location;
}
