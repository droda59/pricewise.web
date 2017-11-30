import { bindable } from "aurelia-framework";
import { UserAlertSummary } from "../../shared/models/user-alert-summary";

export class AlertCard {
    @bindable alert: UserAlertSummary;

    attached() {
        $(".ui.checkbox").checkbox();
    }
}
