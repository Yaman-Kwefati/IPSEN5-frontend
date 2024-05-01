import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.less'
})
export class DeleteModalComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  @Input() message: string = "Weet u het zeker dat u de reservering wilt annuleren?";
  @Input() deleteFunction!: () => void;

  constructor(private route: ActivatedRoute,
              private router: Router,) {
  }

  public closeModal() {
    this.closeModalEvent.emit();
  }

  deletionPressed() {
  }
}
