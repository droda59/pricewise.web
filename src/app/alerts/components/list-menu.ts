import { autoinject } from "aurelia-dependency-injection";
import { bindable } from "aurelia-framework";
import { List } from "../../shared/models/list";
import { ConfirmationModal } from "../../../shared/components/confirmation-modal";
import { ConfirmationModalController } from "../../../confirmation-modal-controller";

@autoinject()
export class ListMenu {
    private _modalController: ConfirmationModalController;

    deleteConfirmationModal: ConfirmationModal;
    shareConfirmationModal: ConfirmationModal;

    @bindable selectedList: List;
    @bindable lists: Array<List>;
    @bindable delete;
    @bindable share;
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

    shareList(list: List): void {
        if (list.isPublic) {
        } else {
            this._modalController.confirm(this.shareConfirmationModal, async () => {
                this.share({ list: list });
            });
        }
    }

    confirmDeleteList(list: List) {
        this._modalController.confirm(this.deleteConfirmationModal, async () => {
            this.delete({ list: list });
            this.selectList();
        });
    }
}
