import { autoinject } from "aurelia-dependency-injection";
import { bindable } from "aurelia-framework";
import { UserAlertSummary } from "../../shared/models/user-alert-summary";
import { Modal } from "../../../shared/modal";

@autoinject()
export class CreateListModal extends Modal {
    private _userId: string;

    @bindable className: string;
    @bindable name: string;
    @bindable alerts: Array<UserAlertSummary> = new Array<UserAlertSummary>();
    @bindable selectedAlerts: Array<UserAlertSummary> = new Array<UserAlertSummary>();
    @bindable save;

    constructor() {
        super();
    }

    attached() {
        $(".ui.checkbox").checkbox();
    }

    createList() {
        this.save({ name: this.name, alerts: this.selectedAlerts });
        this.close();
    }

    protected reset(): void {
        this.name = "";
        this.selectedAlerts = new Array<UserAlertSummary>();
    }
}
