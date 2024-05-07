import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CreateReservationComponent } from './create/create.component';

const routes = [
    {
        path: 'reservations',
        component: CreateReservationComponent,
        children: [
            { path: 'create', component: CreateReservationComponent },
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ReservationModule { }
