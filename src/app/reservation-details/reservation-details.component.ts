import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReservationModel} from "../shared/models/reservation.model";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-reservation-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation-details.component.html',
  styleUrl: './reservation-details.component.scss'
})
export class ReservationDetailsComponent implements OnInit{
  reservation!: ReservationModel;
  id!: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
        .subscribe(
            (params: Params) => {
            const paramsId = params['id'];
            this.id = paramsId.toString();
            //TODO reservation service
            }
        )
  }

}
