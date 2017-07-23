import { autoinject } from "aurelia-dependency-injection";
import { bindable } from "aurelia-framework";
import { Router } from "aurelia-router";
import * as Toastr from "toastr";
import { ConfirmationModalController } from "../confirmation-modal-controller";
import { AlertService } from "../services/alert-service";
import { UserService } from "../services/user-service";
import { UserAlert } from "../models/user-alert";
import { User } from "../models/user";

@autoinject()
export class Alerts {
    private _alertService: AlertService;
    private _userService: UserService;
    private _router: Router;
    private _modalController: ConfirmationModalController;
    private _userId: string;

    // @bindable searchString: string;

    isUpdatingAlert: boolean;
    isCreatingAlert: boolean;
    alerts: Array<UserAlert> = new Array<UserAlert>();
    // originalAlerts: Array<UserAlert> = new Array<UserAlert>();

    constructor(router: Router, userService: UserService, alertService: AlertService, modalController: ConfirmationModalController) {
        this._router = router;
        this._alertService = alertService;
        this._userService = userService;
        this._modalController = modalController;
        this._userId = localStorage.getItem("user-id");
    }

    async activate(): Promise<void> {
        const user = await this._userService.get(this._userId);

        // this.originalAlerts = user.alerts;
        this.alerts = user.alerts;
    }

    detached() {
        $(".ui.modals.page.dimmer").remove();
    }

    async create(newAlertUrl: string): Promise<void> {
        this.isCreatingAlert = true;

        try {
            const newAlert = await this._alertService.create(this._userId, newAlertUrl);
            if (newAlert) {
                this.alerts.push(newAlert);
            } else {
                throw new Error();
            }

            // this.originalAlerts.push(newAlert);

            // if (this.searchString && newAlert.title.toUpperCase().indexOf(this.searchString.toUpperCase()) > -1) {
                // this.alerts.push(newAlert);
            // } else {
            //     throw new Error();
            // }

            Toastr.success("Alert created successfully!", "Success", { timeOut: 3000 });

            this._router.navigateToRoute("alert", { alertId: newAlert.id });
        } catch(e) {
            var errorMessage = "An error occurred during the creation.";
            if (e.status === 404) {
                errorMessage += " The specified source is not yet supported.";
            } else if (e.status === 400) {
                errorMessage += " There was a problem parsing the source.";
            }
            
            Toastr.error(errorMessage, "Error", { timeOut: 3000 });
        } finally {
            this.isCreatingAlert = false;
        }
    }

    async activateAlert(alert: UserAlert): Promise<void> {
        this.isUpdatingAlert = true;

        try {
            alert.isActive = true;

            const updatedAlert = await this._alertService.update(this._userId, alert);
            if (updatedAlert) {
                // This might rebind everything, but we need it when we add an Entry. Maybe a dedicated route would help
                alert = updatedAlert;
            } else {
                throw new Error();
            }

            Toastr.success("Alert activated successfully!", "Success", { timeOut: 3000 });
        } catch(e) {
            Toastr.error("An error occurred during the activation.", "Error", { timeOut: 3000 });
        } finally {
            this.isUpdatingAlert = false;
        }
    }

    removeAlert(alert: UserAlert): void {
        this._modalController.openModal(async () => { 
            this.isUpdatingAlert = true;

            try {
                const alertDeleted = await this._alertService.delete(this._userId, alert.id);
                if (alertDeleted) {
                    // this.originalAlerts.remove(alert);
                    this.alerts.remove(alert);
                } else {
                    throw new Error();
                }

                Toastr.success("Alert deleted successfully!", "Success", { timeOut: 3000 });
            } catch(e) {
                Toastr.error("An error occurred during the deletion.", "Error", { timeOut: 3000 });
            } finally {
                this.isUpdatingAlert = false;
            }
        });
    }

    addAlert(): void {
        $(".ui.dimmer .overlay.modal").modal("show");
    }

    removeModal(): void {
        $(".ui.dimmer .overlay.modal").modal("hide");
    }

    // clearSearch(): void {
    //     this.searchString = "";
    // }

    // private searchStringChanged(newValue: string, oldValue: string): void {
    //     const uppercaseNewValue = newValue.toUpperCase();

    //     this.alerts = this.originalAlerts.filter(x => x.title.toUpperCase().indexOf(uppercaseNewValue) > -1);
    // }
}