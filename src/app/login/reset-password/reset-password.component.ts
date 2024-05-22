import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ResetService} from "../../shared/service/requests/reset.service";

@Component({
    selector: 'app-reset-password',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterLink
    ],
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    public token?: string;

    public username?: string;
    public password?: string;
    public passwordRepeat?: string;

    public isPasswordInvalid = false;
    public isPasswordRepeatInvalid = false;
    public isUsernameInvalid = false;

    constructor(private route: ActivatedRoute,
                private resetService: ResetService,
                private toastr: ToastrService) {
    }

    ngOnInit() {
        const token = this.route.snapshot.paramMap.get('token');
        if (token) {
            this.token = token;
        }
    }

    async onSubmit() {
        const isFormValid = this.validateFormValues();
        if (!isFormValid) {
            return;
        }
        if (this.password && this.checkIfMatching()) {
            await this.changePassword(this.password);
        }
    }

    private async changePassword(password: string) {
        const email = this.username?.toLowerCase();
        if (!email || !this.token) {
            this.toastr.error('Onvolledige gegevens.');
            return;
        }

        try {
            const success = await this.resetService.resetPassword(email, password, this.token);
            if (!success) {
                this.toastr.info('Er is een fout opgetreden bij het wijzigen van het wachtwoord.');
                return;
            }
            this.toastr.success('Wachtwoord succesvol gewijzigd.');
        } catch (error) {
            this.toastr.error('Er is een fout opgetreden bij het wijzigen van het wachtwoord.');
            console.error(error);
        }
    }

    private validateFormValues(): boolean {
        this.isPasswordInvalid = !this.password;
        this.isPasswordRepeatInvalid = !this.passwordRepeat;
        this.isUsernameInvalid = !this.username ||
            !/^(\S+@\S+\.\S+|(\*@gmail\.com)|(\*@student\.hsleiden\.nl)|(\*@cgi\.com))$/.test(this.username.trim());

        if (this.isPasswordInvalid || this.isPasswordRepeatInvalid) {
            this.toastr.error('Vul een wachtwoord in.');
            return false;
        }
        if (!this.checkIfMatching()) {
            this.isPasswordRepeatInvalid = true;
            this.toastr.error('Wachtwoorden komen niet overeen.');
            return false;
        }
        if (this.isUsernameInvalid) {
            this.toastr.error('Ongeldige gebruikersnaam opgegeven.');
            return false;
        }
        return true;
    }


    private checkIfMatching(): boolean {
        return this.password === this.passwordRepeat;
    }


}
