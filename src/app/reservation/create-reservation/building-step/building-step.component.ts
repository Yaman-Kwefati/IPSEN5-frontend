import {
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input, NgZone, OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatStepper, MatStepperModule} from "@angular/material/stepper";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {NgClass} from "@angular/common";
import {BuildingService} from "../../../shared/service/building.service";
import {Building} from "../../../shared/model/building.model";
import {BreakpointObserver} from "@angular/cdk/layout";
import {SwiperContainer} from "swiper/element";

@Component({
  selector: 'app-building-step',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCard,
    MatCardImage,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    NgClass,
  ],
  templateUrl: './building-step.component.html',
  styleUrl: './building-step.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BuildingStepComponent implements OnInit{
  protected firstFormGroup!: FormGroup;
  protected buildings!: Building[];
  @Output() selectedBuilding = new EventEmitter<Building>()
  @Input() stepper!: MatStepper;
  @ViewChild('swiperContainer', { static: false }) swiperContainer!: SwiperContainer;
  protected slidesPerView!: number;

  constructor(private _formBuilder: FormBuilder,
              private buildingService: BuildingService,
              private breakpointObserver: BreakpointObserver,
              private cdRef: ChangeDetectorRef,
              private ngZone: NgZone) {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.buildingService.getBuildings().subscribe(
      data => {
        this.buildings = data.payload;
      }
    );
  }

  ngOnInit(): void {
    this.breakpointObserver.observe('(min-width: 800px)').subscribe(result => {
      this.ngZone.run(() => {
        this.slidesPerView = result.matches ? 3 : 1;
        if (this.swiperContainer) {
          this.swiperContainer.swiper.params.slidesPerView = this.slidesPerView;
          this.swiperContainer.swiper.update();
        }
        this.cdRef.markForCheck();
      });
    });
  }


  protected addSelectedBuilding(value: Building) {
    this.selectedBuilding.emit(value);
  }

  protected toggleActive(selectedBuilding: Building) {
    this.buildings.forEach(building => {
      building.isActive = false;
    });

    selectedBuilding.isActive = true;
  }
}
