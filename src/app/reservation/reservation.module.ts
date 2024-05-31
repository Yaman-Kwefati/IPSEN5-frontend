import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CreateReservationComponent1 } from './create/create.component';
import SwiperCore from "swiper";

const routes = [
    {
        path: 'reservations',
        component: CreateReservationComponent1,
        children: [
            { path: 'create', component: CreateReservationComponent1 },
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class ReservationModule { }
