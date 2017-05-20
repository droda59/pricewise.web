import { autoinject } from "aurelia-dependency-injection";
import * as Toastr from "toastr";
import { ConfirmationModalController } from "../../confirmation-modal-controller";
import { AlertService } from "../../services/alert-service";
import { AlertEntry } from "../../models/alert-entry";
import { UserAlert } from "../../models/user-alert";

@autoinject()
export class Sources {
    private _alertService: AlertService;
    private _modalController: ConfirmationModalController;
    private _userId: string;
    private _alertId: string;

    isAdding: boolean;
    alert: UserAlert;

    constructor(alertService: AlertService, modalController: ConfirmationModalController) {
        this._alertService = alertService;
        this._modalController = modalController;
    }

    async activate(route): Promise<void> {
        if (route.alertId) {
            this._userId = localStorage.getItem("user-id");
            this._alertId = route.alertId;

            this.alert = await this._alertService.get(this._userId, this._alertId);
        }
    }

    cancel(): void {
        this.isAdding = false;
    }

    addSource(): void {
        this.isAdding = true;
        $(".ui.overlay.dimmer").dimmer("show");
    }

    async addEntry(newEntryUrl: string): Promise<void> {
        var newEntry = new AlertEntry();
        newEntry.uri = newEntryUrl;

        this.alert.entries.push(newEntry);

        await this.updateAlert();

        this.isAdding = false;
    }

    async removeEntry(entry: AlertEntry): Promise<void> {
        this._modalController.openModal(async () => { 
            entry.isDeleted = true;

            await this.updateAlert();
        });
    }

    private async updateAlert(): Promise<void> {
        try {
            var updatedAlert = await this._alertService.update(this._userId, this.alert);

            if (updatedAlert) {
                // This might rebind everything, but we need it when we add an Entry. Maybe a dedicated route would help
                this.alert = updatedAlert;
            }

            Toastr.success("Alert saved successfully!", "Success", { timeOut: 3000 });
        } catch(e) {
            Toastr.error("An error ocurred during the save.", "Error", { timeOut: 3000 });
        }
    }
}