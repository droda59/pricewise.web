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

    alert: UserAlert;
    isUpdatingAlert: boolean;

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

    detached() {
        $(".ui.modals.page.dimmer").remove();
    }

    addSource(): void {
        $(".ui.dimmer .overlay.modal").modal("show");
    }

    async addEntry(newEntryUrl: string): Promise<void> {
        var newEntry = new AlertEntry();
        newEntry.uri = newEntryUrl;

        this.alert.entries.push(newEntry);

        await this.updateAlert();
    }

    removeEntry(entry: AlertEntry): void {
        this._modalController.openModal(async () => { 
            entry.isDeleted = true;

            await this.updateAlert();
        });
    }

    private async updateAlert(): Promise<void> {
        this.isUpdatingAlert = true; 

        try {
            var updatedAlert = await this._alertService.update(this._userId, this.alert);
            if (updatedAlert) {
                // This might rebind everything, but we need it when we add an Entry. Maybe a dedicated route would help
                this.alert = updatedAlert;
            } else {
                throw new Error();
            }

            Toastr.success("Alert saved successfully!", "Success", { timeOut: 3000 });
        } catch(e) {
            var errorMessage = "An error ocurred during the update.";
            if (e.status === 404) {
                errorMessage += " The specified source is not yet supported.";
            } else if (e.status === 400) {
                errorMessage += " There was a problem parsing the source.";
            }

            Toastr.error(errorMessage, "Error", { timeOut: 3000 });
        } finally {
            this.isUpdatingAlert = false;
        }
    }
}