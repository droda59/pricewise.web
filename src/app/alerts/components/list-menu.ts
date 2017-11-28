import { autoinject } from "aurelia-dependency-injection";
import { bindable } from "aurelia-framework";
import { ListSummary } from "../../shared/models/list-summary";
import { ConfirmationModal } from "../../../shared/components/confirmation-modal";
import { ConfirmationModalController } from "../../../confirmation-modal-controller";

@autoinject()
export class ListMenu {
    private _modalController: ConfirmationModalController;

    confirmationModal: ConfirmationModal;

    @bindable selectedList: ListSummary;
    @bindable lists: Array<ListSummary>;
    @bindable delete;
    @bindable add;

    constructor(modalController: ConfirmationModalController) {
        this._modalController = modalController;
    }

    selectList(list?: ListSummary): void {
        if (!list && this.selectedList != null) {
            this.selectedList = null;
        } else if (this.selectedList != list) {
            this.selectedList = list;
        }
    }

    confirmDeleteList(list: ListSummary) {
        this._modalController.confirm(this.confirmationModal, async () => {
            this.delete({ list: list });
            this.selectList();
        });
    }
}
