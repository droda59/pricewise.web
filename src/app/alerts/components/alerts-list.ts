import { autoinject } from "aurelia-dependency-injection";
import { bindable } from "aurelia-framework";
import { UserAlertSummary } from "../../shared/models/user-alert-summary";

@autoinject()
export class AlertsList {
    @bindable selectedAlerts: Array<UserAlertSummary>;
    @bindable alerts: Array<UserAlertSummary>;
    @bindable isReadOnly: boolean;
    @bindable add;
    @bindable activate;

    alertsChanged(): void {
        this.selectedAlerts = new Array<UserAlertSummary>();
    }
}
