import { autoinject } from "aurelia-dependency-injection";
import { bindable } from "aurelia-framework";
import { Router } from "aurelia-router";
import { EventAggregator } from "aurelia-event-aggregator";
import { I18N, BaseI18N } from "aurelia-i18n";
import { ConfirmationModalController } from "../confirmation-modal-controller";
import { Toaster } from "../services/toaster";
import { AlertService } from "../services/alert-service";
import { UserService } from "../services/user-service";
import { UserAlert } from "../models/user-alert";
import { User } from "../models/user";

@autoinject()
export class Alerts extends BaseI18N {
    private _alertService: AlertService;
    private _userService: UserService;
    private _router: Router;
    private _modalController: ConfirmationModalController;
    private _toaster: Toaster;
    private _userId: string;

    // @bindable searchString: string;

    isUpdatingAlert: boolean;
    isCreatingAlert: boolean;
    alerts: Array<UserAlert> = new Array<UserAlert>();
    // originalAlerts: Array<UserAlert> = new Array<UserAlert>();

    constructor(
            router: Router, 
            userService: UserService, 
            alertService: AlertService, 
            modalController: ConfirmationModalController, 
            toaster: Toaster,
            i18n: I18N, 
            element: Element, 
            ea: EventAggregator) {
        super(i18n, element, ea);

        this._router = router;
        this._alertService = alertService;
        this._userService = userService;
        this._modalController = modalController;
        this._toaster = toaster;
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

            this._toaster.showSuccess("alerts.alertCreated");
            this._router.navigateToRoute("alert", { alertId: newAlert.id });
        } catch(e) {
            var errorMessage = "";
            if (e.status === 404) {
                errorMessage = "errors.sourceNotSupported";
            } else if (e.status === 400) {
                errorMessage = "errors.parseError";
            }
            
            this._toaster.showException("alerts.alertCreated", errorMessage);
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

            this._toaster.showSuccess("alerts.alertActivated");
        } catch(e) {
            this._toaster.showError("alerts.alertActivated");
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

                this._toaster.showSuccess("alerts.alertDeleted");
            } catch(e) {
                this._toaster.showError("alerts.alertDeleted");
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