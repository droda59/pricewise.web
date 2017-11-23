import { autoinject } from "aurelia-dependency-injection";
import { bindable } from "aurelia-framework";
import { Router } from "aurelia-router";
import { EventAggregator } from "aurelia-event-aggregator";
import { I18N, BaseI18N } from "aurelia-i18n";
import { Toaster } from "../shared/services/toaster";
import { AlertService } from "../shared/services/alert-service";
import { ListService } from "../shared/services/list-service";
import { UserAlertSummary } from "../shared/models/user-alert-summary";
import { List } from "../shared/models/list";
import { ListSummary } from "../shared/models/list-summary";
import { ConfirmationModalController } from "../../confirmation-modal-controller";

@autoinject()
export class Alerts extends BaseI18N {
    private _alertService: AlertService;
    private _listService: ListService;
    private _router: Router;
    private _ea: EventAggregator;
    private _modalController: ConfirmationModalController;
    private _toaster: Toaster;
    private _userId: string;

    isUpdatingAlert: boolean;
    isCreatingAlert: boolean;
    isUpdatingList: boolean;
    currentList: List;
    alerts: Array<UserAlertSummary> = new Array<UserAlertSummary>();

    @bindable currentListFilter: ListSummary;

    constructor(
            router: Router,
            alertService: AlertService,
            listService: ListService,
            modalController: ConfirmationModalController,
            toaster: Toaster,
            i18n: I18N,
            element: Element,
            ea: EventAggregator) {
        super(i18n, element, ea);

        this._userId = localStorage.getItem("user_id");
        this._router = router;
        this._alertService = alertService;
        this._listService = listService;
        this._ea = ea;
        this._modalController = modalController;
        this._toaster = toaster;
    }

    async activate(): Promise<void> {
        this.alerts = await this._alertService.getSummaries(this._userId);
    }

    detached() {
        $(".ui.modals.page.dimmer").remove();
    }

    async updateList(name: string, alerts: Array<UserAlertSummary>): Promise<void> {
        this.isUpdatingList = true;

        try {
            var list = new List();
            list.name = name;
            list.alerts = alerts;

            const updatedList = await this._listService.create(this._userId, list);
            if (!updatedList) {
                throw new Error();
            }

            this.currentListFilter = updatedList;

            this._toaster.showSuccess("lists.listUpdated");
        } catch(e) {
            this._toaster.showError("lists.listUpdated");
        } finally {
            this.isUpdatingList = false;
        }
    }

    async create(newAlertUrl: string): Promise<void> {
        this.isCreatingAlert = true;

        try {
            const newAlert = await this._alertService.create(this._userId, newAlertUrl);
            if (!newAlert) {
                throw new Error();
            }

            this._ea.publish("alertCreated", { alert: newAlert });

            if (this.currentList) {
                this.currentList.alerts.push(newAlert);

                this._listService.update(this._userId, this.currentList);
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

    async removeAlert(alert: UserAlertSummary): Promise<void> {
        this.isUpdatingAlert = true;

        try {
            const alertDeleted = await this._alertService.delete(this._userId, alert.id);
            if (!alertDeleted) {
                throw new Error();
            }

            this.alerts.remove(alert);
            this._ea.publish("alertDeleted", { alert: alert });

            if (this.currentList) {
                this.currentList.alerts.remove(alert);

                this._listService.update(this._userId, this.currentList);
            }

            this._toaster.showSuccess("alerts.alertDeleted");
        } catch(e) {
            this._toaster.showError("alerts.alertDeleted");
        } finally {
            this.isUpdatingAlert = false;
        }
    }

    confirmRemoveAlert(alert: UserAlertSummary): void {
        this._modalController.openModal(async () => { await this.removeAlert(alert); }, "delete-alert");
    }

    showModal(modalIdentifier: string): void {
        $(`.ui.dimmer .overlay.modal.${modalIdentifier}`).modal("show");
    }

    removeModal(modalIdentifier: string): void {
        $(`.ui.dimmer .overlay.modal.${modalIdentifier}`).modal("hide");
    }

    async currentListFilterChanged(newValue: ListSummary, oldValue: ListSummary) {
        if (newValue != oldValue) {
            if (!newValue) {
                this.currentList = undefined;
                this.alerts = await this._alertService.getSummaries(this._userId);
            } else {
                this.currentList = await this._listService.get(this._userId, newValue.id);
                this.alerts = this.currentList.alerts;
            }
        }
    }
 }
