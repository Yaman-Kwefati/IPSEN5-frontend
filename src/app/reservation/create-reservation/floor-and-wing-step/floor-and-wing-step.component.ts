import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {Floor} from "../../../shared/model/floor.model";
import {Wing} from "../../../shared/model/wing.model";
import {FloorService} from "../../../shared/service/floor.service";
import {WingService} from "../../../shared/service/wing.service";
import {Building} from "../../../shared/model/building.model";

@Component({
  selector: 'app-floor-and-wing-step',
  standalone: true,
    imports: [
        FormsModule,
        MatButton,
        MatFormField,
        MatLabel,
        MatOption,
        MatSelect,
        MatStepperNext,
        MatStepperPrevious,
        ReactiveFormsModule
    ],
  templateUrl: './floor-and-wing-step.component.html',
  styleUrl: './floor-and-wing-step.component.scss'
})
export class FloorAndWingStepComponent implements OnInit{
  floorAndWingFormGroup: FormGroup;
  floors!: Floor[];
  wings!: Wing[];
  floorId: string | null = null;
  @Input() selectedBuilding!: Building;
  @Output() selectedWing = new EventEmitter<Wing>();
  @Output() selectedFloor = new EventEmitter<Floor>();

  constructor(private _formBuilder: FormBuilder,
              private floorService: FloorService,
              private wingService: WingService) {
    this.floorAndWingFormGroup = this._formBuilder.group({
      selectedFloor: new FormControl(null, Validators.required),
      selectedWing: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedBuilding'] && changes['selectedBuilding'].currentValue) {
      this.getFloorsByBuildingName();
    }
  }

  getFloorsByBuildingName(): void {
    if (this.selectedBuilding) {
      this.floorService.getFloorsByBuildingId(this.selectedBuilding.id).subscribe(
        data => {
          this.floors = data.payload;
        }
      );
    }
  }

  getWingsByFloorId(floorId: string) {
    this.wingService.getWingsByFloorId(floorId).subscribe(
      data => {
        this.wings = data.payload;
      }
    );
  }

  onFloorSelectionChange(event: Floor) {
    this.floorId = event.id;
    this.selectedFloor.emit(event);
  }

  onWingSelectionChange(event: Wing) {
    this.selectedWing.emit(event);
    this.floorAndWingFormGroup.setValue({selectedFloor: this.selectedFloor, selectedWing: event});
  }
}
