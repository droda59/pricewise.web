import { autoinject } from "aurelia-dependency-injection";
import { bindable } from "aurelia-framework";
import { EventAggregator, Subscription } from "aurelia-event-aggregator";
import { ListSummary } from "../../shared/models/list-summary";
import { ConfirmationModalController } from "../../../confirmation-modal-controller";

@autoinject()
export class ListMenu {
    private _ea: EventAggregator;
    private _modalController: ConfirmationModalController;
    private _listCreatedSubscription: Subscription;
    private _listDeletedSubscription: Subscription;

    @bindable selectedList: ListSummary;
    @bindable lists: Array<ListSummary>;
    @bindable delete;
    @bindable add;

    constructor(ea: EventAggregator, modalController: ConfirmationModalController) {
        this._ea = ea;
        this._modalController = modalController;
    }

    attached() {
        // this._listCreatedSubscription = this._ea.subscribe("listCreated", list => this.lists.push(list));
        // this._listDeletedSubscription = this._ea.subscribe("listDeleted", list => this.lists.remove(list));
    }

    detached() {
        // this._listCreatedSubscription.dispose();
        // this._listDeletedSubscription.dispose();
    }

    selectList(list?: ListSummary): void {
        if (!list && this.selectedList != null) {
            this.selectedList = null;
        } else if (this.selectedList != list) {
            this.selectedList = list;
        }
    }

    confirmDeleteList(list: ListSummary) {
        this._modalController.openModal(async () => {
            this.delete({ list: list });
            this.selectList();
        }, "delete-list");
    }
}
