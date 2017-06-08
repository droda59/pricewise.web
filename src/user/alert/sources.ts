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
    isAddingSource: boolean;

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

    removeModal(): void {
        $(".ui.dimmer .overlay.modal").modal("hide");
    }

    async addEntry(newEntryUrl: string): Promise<void> {
        this.isAddingSource = true; 

        var newEntry = new AlertEntry();
        newEntry.uri = newEntryUrl;

        var alertToUpdate = new UserAlert(this.alert);
        alertToUpdate.entries.push(newEntry);

        try {
            var updatedAlert = await this._alertService.update(this._userId, alertToUpdate);
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
            this.isAddingSource = false;
        }
    }

    removeEntry(entry: AlertEntry): void {
        this._modalController.openModal(async () => { 
            this.isUpdatingAlert = true; 

            entry.isDeleted = true;

            try {
                var updatedAlert = await this._alertService.update(this._userId, this.alert);
                if (updatedAlert) {
                    // This might rebind everything, but we need it when we remove an Entry. Maybe a dedicated route would help
                    this.alert = updatedAlert;
                } else {
                    throw new Error();
                }

                Toastr.success("Alert updated successfully!", "Success", { timeOut: 3000 });
            } catch(e) {
                Toastr.error("An error ocurred during the update.", "Error", { timeOut: 3000 });
            } finally {
                this.isUpdatingAlert = false;
            }
        });
    }
}