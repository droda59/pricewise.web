import { autoinject } from "aurelia-dependency-injection";
import { bindable } from "aurelia-framework";
import { EventAggregator, Subscription } from "aurelia-event-aggregator";
import { UserAlertSummary } from "../../shared/models/user-alert-summary";
import { ConfirmationModal } from "../../../shared/components/confirmation-modal";
import { ConfirmationModalController } from "../../../confirmation-modal-controller";

@autoinject()
export class AlertsList {
    private _ea: EventAggregator;
    private _modalController: ConfirmationModalController;
    private _alertCreatedSubscription: Subscription;
    private _alertDeletedSubscription: Subscription;

    confirmationModal: ConfirmationModal;

    @bindable alerts: Array<UserAlertSummary>;
    @bindable delete;
    @bindable add;
    @bindable activate;

    constructor(ea: EventAggregator, modalController: ConfirmationModalController) {
        this._ea = ea;
        this._modalController = modalController;
    }

    attached() {
        // this._alertCreatedSubscription = this._ea.subscribe("alertCreated", alert => this.alerts.push(alert));
        // this._alertDeletedSubscription = this._ea.subscribe("alertDeleted", alert => this.alerts.remove(alert));
    }

    detached() {
        // this._alertCreatedSubscription.dispose();
        // this._alertDeletedSubscription.dispose();
    }

    confirmDeleteAlert(alert: UserAlertSummary) {
        this._modalController.openConfirmationModal(this.confirmationModal, async () => {
            this.delete({ alert: alert });
        });
    }
}
