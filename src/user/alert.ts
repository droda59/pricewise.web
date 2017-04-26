import { bindable } from "aurelia-framework";
import { autoinject } from "aurelia-dependency-injection";
import * as Toastr from "toastr";
import { ConfirmationModalController } from "../confirmation-modal-controller";
import { AlertService } from "../services/alert-service";
import { AlertEntry } from "../models/alert-entry";
import { UserAlert } from "../models/user-alert";

@autoinject()
export class Alert {
    private _alertService: AlertService;
    private _modalController: ConfirmationModalController;
    private _userId: string;
    private _alertId: string;

    @bindable title: string;

    alert: UserAlert;
    newEntryUrl: string;

    constructor(alertService: AlertService, modalController: ConfirmationModalController) {
        this._alertService = alertService;
        this._modalController = modalController;
        this._userId = localStorage.getItem("user-id");
    }

    async activate(route, routeConfig): Promise<void> {
        if (route.alertId) {
            this._alertId = route.alertId;

            this.alert = await this._alertService.get(this._userId, this._alertId);
            this.title = this.alert.title;

            routeConfig.navModel.title = this.alert.title;
        }
    }

    async addEntry(): Promise<void> {
        var newEntry = new AlertEntry();
        newEntry.uri = this.newEntryUrl;

        this.alert.entries.push(newEntry);

        await this.updateAlert();

        this.newEntryUrl = "";
    }

    async removeEntry(entry: AlertEntry): Promise<void> {
        this._modalController.openModal(async () => { 
            entry.isDeleted = true;

            await this.updateAlert();
        });
    }

    async titleChanged(newValue: string, oldValue: string): Promise<void> {
        if (newValue != oldValue) {
            this.alert.title = this.title;

            await this.updateAlert();
        }
    }

    private async updateAlert(): Promise<void> {
        var updatedAlert: UserAlert;
        
        try {
            updatedAlert = await this._alertService.update(this._userId, this.alert);

            Toastr.success("Alert saved successfully!", "Success", { timeOut: 3000 });
        } catch(e) {
            Toastr.error("An error ocurred during the save.", "Error", { timeOut: 3000 });
        } finally {
            if (updatedAlert) {
                this.alert = updatedAlert;
                this.title = this.alert.title;
            }
        }
    }
}