import { bindable } from "aurelia-framework";
import { UserAlertSummary } from "../../shared/models/user-alert-summary";
import { List } from "../../shared/models/list";
import { Modal } from "../../../shared/modal";

export class CreateListModal extends Modal {
    isUpdating: boolean;

    @bindable name: string;
    @bindable isWorking: boolean;
    @bindable alerts: Array<UserAlertSummary> = new Array<UserAlertSummary>();
    @bindable save;

    saveList() {
        var newList = new List();
        newList.name = this.name;
        newList.alerts = this.alerts;

        this.save({ list: newList });
        this.close();
    }

    protected reset(): void {
        this.name = undefined;
    }
}
