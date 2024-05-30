import { Component, Input } from '@angular/core';
import { DefaultLocation } from '../../shared/model/default-location.model';

@Component({
  selector: 'app-default-location',
  standalone: true,
  imports: [],
  templateUrl: './default-location.component.html',
  styleUrl: './default-location.component.scss'
})
export class DefaultLocationComponent {
  @Input() defaultLocation!: DefaultLocation;

}
