import { autoinject } from "aurelia-dependency-injection";
import { bindable } from "aurelia-framework";
import { UserAlertSummary } from "../../shared/models/user-alert-summary";
import { ConfirmationModal } from "../../../shared/components/confirmation-modal";
import { ConfirmationModalController } from "../../../confirmation-modal-controller";

@autoinject()
export class AlertsList {
    private _modalController: ConfirmationModalController;

    confirmationModal: ConfirmationModal;

    @bindable alerts: Array<UserAlertSummary>;
    @bindable delete;
    @bindable add;
    @bindable activate;

    constructor(modalController: ConfirmationModalController) {
        this._modalController = modalController;
    }

    confirmDeleteAlert(alert: UserAlertSummary) {
        this._modalController.confirm(this.confirmationModal, async () => {
            this.delete({ alert: alert });
        });
    }
}
