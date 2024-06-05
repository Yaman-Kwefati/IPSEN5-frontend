import { Component, Input } from '@angular/core';
import { StandardLocation } from '../../shared/model/standard-location.model';
import { Wing } from '../../shared/model/wing.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-default-location',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './default-location.component.html',
  styleUrl: './default-location.component.scss'
})
export class DefaultLocationComponent {
  @Input() defaultLocation!: Wing;

}
