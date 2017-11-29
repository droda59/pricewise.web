import { bindable } from "aurelia-framework";
import { UserAlertSummary } from "../../shared/models/user-alert-summary";
import { List } from "../../shared/models/list";
import { Modal } from "../../../shared/modal";

export class CreateListModal extends Modal {
    private _userId: string;

    isUpdating: boolean;
    idMatcher = (a, b) => a.id === b.id;

    @bindable list: List = new List();
    @bindable isWorking: boolean;
    @bindable alerts: Array<UserAlertSummary> = new Array<UserAlertSummary>();
    @bindable save;

    bind() {
        if (!this.list) {
            this.list = new List();
        }
    }

    attached() {
        $(".ui.checkbox").checkbox();
    }

    saveList() {
        this.save({ list: this.list });
        this.close();
    }

    protected reset(): void {
        this.list = new List();
    }
}
