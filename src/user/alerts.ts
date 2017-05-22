import { autoinject } from "aurelia-dependency-injection";
import { bindable } from "aurelia-framework";
import { Router } from "aurelia-router";
import * as toastr from "toastr";
import { ConfirmationModalController } from "../confirmation-modal-controller";
import { AlertService } from "../services/alert-service";
import { UserService } from "../services/user-service";
import { UserAlert } from "../models/user-alert";
import { User } from "../models/user";

@autoinject()
export class Alerts {
    private _alertService: AlertService;
    private _userService: UserService;
    private _modalController: ConfirmationModalController;
    private _userId: string;
    private _originalAlerts: Array<UserAlert> = new Array<UserAlert>();

    @bindable searchString: string;

    router: Router;
    isUpdatingAlert: boolean;
    isCreatingAlert: boolean;
    alerts: Array<UserAlert> = new Array<UserAlert>();

    constructor(router: Router, userService: UserService, alertService: AlertService, modalController: ConfirmationModalController) {
        this.router = router;
        this._alertService = alertService;
        this._userService = userService;
        this._modalController = modalController;
        this._userId = localStorage.getItem("user-id");
    }

    async activate(): Promise<void> {
        // const user = await this._userService.get(this._userId);

        this._originalAlerts = [];//user.alerts;
        this.alerts = [];//user.alerts;
    }

    detached() {
        $(".ui.modals.page.dimmer").remove();
    }

    async create(newAlertUrl: string): Promise<void> {
        this.isCreatingAlert = true;

        const newAlert = await this._alertService.create(this._userId, newAlertUrl);
        this._originalAlerts.push(newAlert);

        if (this.searchString && newAlert.title.toUpperCase().indexOf(this.searchString.toUpperCase()) > -1) {
            this.alerts.push(newAlert);
        }

        this.isCreatingAlert = false;
    }

    removeAlert(alert: UserAlert): void {
        this._modalController.openModal(async () => { 
            this.isUpdatingAlert = true;

            const alertDeleted = await this._alertService.delete(this._userId, alert.id);
            if (alertDeleted) {
                this._originalAlerts.remove(alert);
                this.alerts.remove(alert);
            }

            this.isUpdatingAlert = false;
        });
    }

    addAlert(): void {
        $(".ui.dimmer .overlay.modal").modal("show");
    }

    clearSearch(): void {
        this.searchString = "";
    }

    private searchStringChanged(newValue: string, oldValue: string): void {
        const uppercaseNewValue = newValue.toUpperCase();

        this.alerts = this._originalAlerts.filter(x => x.title.toUpperCase().indexOf(uppercaseNewValue) > -1);
    }
}