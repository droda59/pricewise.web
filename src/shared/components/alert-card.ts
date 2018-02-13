import { bindable } from "aurelia-framework";
import { UserAlertSummary } from "../models/user-alert-summary";

export class AlertCard {
    @bindable alert: UserAlertSummary;
    @bindable navigate;

    attached() {
        $(".ui.checkbox").checkbox();
    }

    navigateToAlert(alert: UserAlertSummary): void {
        this.navigate({ alert: alert });
    }
}
