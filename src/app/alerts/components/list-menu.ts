import { autoinject } from "aurelia-dependency-injection";
import { bindable } from "aurelia-framework";
import { List } from "../../shared/models/list";
import { ConfirmationModal } from "../../../shared/components/confirmation-modal";
import { ConfirmationModalController } from "../../../confirmation-modal-controller";

@autoinject()
export class ListMenu {
    private _modalController: ConfirmationModalController;

    confirmationModal: ConfirmationModal;

    @bindable selectedList: List;
    @bindable lists: Array<List>;
    @bindable delete;
    @bindable add;

    constructor(modalController: ConfirmationModalController) {
        this._modalController = modalController;
    }

    selectList(list?: List): void {
        if (!list && this.selectedList != null) {
            this.selectedList = null;
        } else if (this.selectedList != list) {
            this.selectedList = list;
        }
    }

    confirmDeleteList(list: List) {
        this._modalController.confirm(this.confirmationModal, async () => {
            this.delete({ list: list });
            this.selectList();
        });
    }
}
