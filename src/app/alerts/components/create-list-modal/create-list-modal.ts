import { autoinject } from "aurelia-dependency-injection";
import { bindable } from "aurelia-framework";
import { UserAlertSummary } from "../../../shared/models/user-alert-summary";

@autoinject()
export class CreateListModal {
    @bindable className: string;
    @bindable name: string;
    @bindable alerts: Array<UserAlertSummary>;
    @bindable selectedAlerts: Array<UserAlertSummary> = new Array<UserAlertSummary>();
    @bindable save;
    @bindable close;

    attached() {
        $(".ui.checkbox").checkbox();
    }

    createList() {
        this.save({ name: this.name, alerts: this.selectedAlerts });
        this.name = "";
        this.selectedAlerts = new Array<UserAlertSummary>();
        this.close();
    }
}
