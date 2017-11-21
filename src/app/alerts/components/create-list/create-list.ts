import { autoinject } from "aurelia-dependency-injection";
import { bindable } from "aurelia-framework";
import { UserAlertSummary } from "../../../shared/models/user-alert-summary";

@autoinject()
export class CreateList {
    @bindable className: string;
    @bindable alerts: Array<UserAlertSummary>;
    @bindable create;
    @bindable close;

    name: string;
    selectedAlerts: Array<UserAlertSummary> = new Array<UserAlertSummary>();

    attached() {
        $(".ui.checkbox").checkbox();
    }

    createList() {
        this.create({ name: this.name, alerts: this.selectedAlerts });
        this.name = "";
        this.close();
    }
}
