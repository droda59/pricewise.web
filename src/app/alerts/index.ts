import { autoinject } from "aurelia-dependency-injection";
import { Router } from "aurelia-router";
import { EventAggregator } from "aurelia-event-aggregator";
import { I18N, BaseI18N } from "aurelia-i18n";
import { Toaster } from "../shared/services/toaster";
import { AlertService } from "../shared/services/alert-service";
import { UserAlertSummary } from "../shared/models/user-alert-summary";
import { ConfirmationModalController } from "../../confirmation-modal-controller";

@autoinject()
export class Alerts extends BaseI18N {
    private _alertService: AlertService;
    private _router: Router;
    private _modalController: ConfirmationModalController;
    private _toaster: Toaster;
    private _userId: string;

    isUpdatingAlert: boolean;
    isCreatingAlert: boolean;
    alerts: Array<UserAlertSummary> = new Array<UserAlertSummary>();

    constructor(
            router: Router,
            alertService: AlertService,
            modalController: ConfirmationModalController,
            toaster: Toaster,
            i18n: I18N,
            element: Element,
            ea: EventAggregator) {
        super(i18n, element, ea);

        this._router = router;
        this._alertService = alertService;
        this._modalController = modalController;
        this._toaster = toaster;
        this._userId = localStorage.getItem("user-id");
    }

    async activate(): Promise<void> {
        this.alerts = await this._alertService.getSummaries(this._userId);
    }

    detached() {
        $(".ui.modals.page.dimmer").remove();
    }

    async create(newAlertUrl: string): Promise<void> {
        this.isCreatingAlert = true;

        try {
            const newAlert = await this._alertService.create(this._userId, newAlertUrl);
            if (!newAlert) {
                throw new Error();
            }

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

    async activateAlert(alert: UserAlertSummary): Promise<void> {
        this.isUpdatingAlert = true;

        try {
            alert.isActive = true;

            const alertUpdated = await this._alertService.activate(this._userId, alert.id, alert.isActive);
            if (!alertUpdated) {
                throw new Error();
            }

            this._toaster.showSuccess("alerts.alertActivated");
        } catch(e) {
            this._toaster.showError("alerts.alertActivated");
        } finally {
            this.isUpdatingAlert = false;
        }
    }

    removeAlert(alert: UserAlertSummary): void {
        this._modalController.openModal(async () => {
            this.isUpdatingAlert = true;

            try {
                const alertDeleted = await this._alertService.delete(this._userId, alert.id);
                if (alertDeleted) {
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
}
