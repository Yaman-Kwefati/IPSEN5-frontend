import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-default-location',
  standalone: true,
  imports: [],
  templateUrl: './default-location.component.html',
  styleUrl: './default-location.component.scss'
})
export class DefaultLocationComponent {
  @Input() defaultLocation!: {
    location: string,
    floor: number,
    wing: string,
  };

}
