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
import { CreateListModal } from "./components/create-list-modal";
import { AddSourceModal } from "../shared/components/add-source-modal";
import { ConfirmationModal } from "../../shared/components/confirmation-modal";
import { Modal } from "../../shared/modal";
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

    createListModal: CreateListModal;
    createAlertModal: AddSourceModal;
    confirmationModal: ConfirmationModal;
    isUpdating: boolean;
    currentList: List;
    alerts: Array<UserAlertSummary> = new Array<UserAlertSummary>();
    allAlerts: Array<UserAlertSummary> = new Array<UserAlertSummary>();
    selectedAlerts: Array<UserAlertSummary> = new Array<UserAlertSummary>();
    lists: Array<List> = new Array<List>();

    @bindable currentListFilter: List;

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
        var alertPromise = this._alertService.getSummaries(this._userId);
        var listPromise = this._listService.getSummaries(this._userId);

        const [alerts, lists] = await Promise.all([alertPromise, listPromise]);

        this.allAlerts = alerts;
        this.lists = lists;
        this.alerts = this.allAlerts;
    }

    attached() {
        $(".ui.dropdown").dropdown();
    }

    detached() {
        $(".ui.modals.page.dimmer").remove();
    }

    async saveList(list: List): Promise<void> {
        if (list.id) {
            await this._updateList(list);
        } else {
            await this._createList(list);
        }

        this.clearSelection();
    }

    async deleteList(list: List) {
        this.isUpdating = true;

        try {
            const listDeleted = await this._listService.delete(this._userId, list.id);
            if (!listDeleted) {
                throw new Error();
            }

            this.lists.remove(list);
            this._ea.publish("listDeleted", { list: list });

            this._toaster.showSuccess("lists.listDeleted");
        } catch(e) {
            this._toaster.showError("lists.listDeleted");
        } finally {
            this.isUpdating = false;
        }
    }

    async createAlert(newAlertUrl: string): Promise<void> {
        this.isUpdating = true;

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
            this.isUpdating = false;
        }
    }

    async activateAlert(alert: UserAlertSummary): Promise<void> {
        this.isUpdating = true;

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
            this.isUpdating = false;
        }
    }

    async removeFromList(alerts: Array<UserAlertSummary>): Promise<void> {
        alerts.forEach(alert => this.currentList.alerts.remove(alert));

        await this.saveList(this.currentList);
    }

    async addToList(alerts: Array<UserAlertSummary>, list: List): Promise<void> {
        alerts.forEach(alert => list.alerts.push(alert));

        await this.saveList(list);
    }

    clearSelection(): void {
        this.selectedAlerts = new Array<UserAlertSummary>();
    }

    confirmDeleteAlert(alerts: Array<UserAlertSummary>): void {
        this._modalController.confirm(this.confirmationModal, async () => await this._deleteAlerts(alerts));
    }

    showModal(modal: Modal): void {
        this._modalController.openOverlayModal(modal);
    }

    async currentListFilterChanged(newValue: List, oldValue: List) {
        if (newValue != oldValue) {
            this.isUpdating = true;

            if (!newValue) {
                this.currentList = undefined;
                this.allAlerts = await this._alertService.getSummaries(this._userId);
                this.alerts = this.allAlerts;
            } else {
                this.currentList = await this._listService.get(this._userId, newValue.id);
                this.alerts = this.currentList.alerts;
            }

            this.clearSelection();

            this.isUpdating = false;
        }
    }

    private async _updateList(list: List): Promise<void> {
        this.isUpdating = true;

        try {
            const updatedList = await this._listService.update(this._userId, list);
            if (!updatedList) {
                throw new Error();
            }

            this.currentListFilter = updatedList;
            var listIndex = this.lists.findIndex(x => x.id === updatedList.id);
            this.lists.splice(listIndex, 1, updatedList);

            this._ea.publish("listUpdated", { list: updatedList });
            this._toaster.showSuccess("lists.listUpdated");
        } catch(e) {
            this._toaster.showError("lists.listUpdated");
        } finally {
            this.isUpdating = false;
        }
    }

    private async _createList(list: List): Promise<void> {
        this.isUpdating = true;

        try {
            const newList = await this._listService.create(this._userId, list);
            if (!newList) {
                throw new Error();
            }

            this.lists.push(newList);

            this._ea.publish("listCreated", { list: newList });
            this._toaster.showSuccess("lists.listCreated");
        } catch(e) {
            this._toaster.showError("lists.listCreated");
        } finally {
            this.isUpdating = false;
        }
    }

    private async _deleteAlerts(alerts: Array<UserAlertSummary>): Promise<void> {
        this.isUpdating = true;

        try {
            alerts.forEach(async alert => {
                const alertDeleted = await this._alertService.delete(this._userId, alert.id);
                if (!alertDeleted) {
                    throw new Error();
                }

                this.alerts.removeWhere(x => x.id == alert.id);
                this.allAlerts.removeWhere(x => x.id == alert.id);
            });

            this.clearSelection();

            this._ea.publish("alertDeleted", { alert: alert });

            this._toaster.showSuccess("alerts.alertDeleted");
        } catch(e) {
            this._toaster.showError("alerts.alertDeleted");
        } finally {
            this.isUpdating = false;
        }
    }
 }
