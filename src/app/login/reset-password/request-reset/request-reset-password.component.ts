import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {ToastrService} from "ngx-toastr";
import {ResetPasswordService} from "../../../shared/service/requests/reset-password.service";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-reset-password',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterLink,
        CommonModule
    ],
    templateUrl: './request-reset-password.component.html',
    styleUrls: ['./request-reset-password.component.scss']
})
export class RequestResetPasswordComponent implements OnInit {
    resetForm!: FormGroup;

    constructor(private fb: FormBuilder,
                private resetService: ResetPasswordService,
                private toastr: ToastrService) {

    }

    ngOnInit() {
        this.resetForm = this.fb.group({
            username: ['', [Validators.required, Validators.email]]
        });
    }

    onSubmit() {
        if (this.resetForm.valid) {
            this.requestTokenEmail();
        }
    }

    private requestTokenEmail(): void {
        const email = this.resetForm.value.username?.toLowerCase();
        if (!email) {
            this.toastr.error('Vul een geldige gebruikersnaam in.');
            return;
        } else {
            this.resetService.sendTokenEmail(email);

        }
    }
}
