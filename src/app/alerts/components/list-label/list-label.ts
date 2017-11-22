import { autoinject } from "aurelia-dependency-injection";
import { bindable, containerless } from "aurelia-framework";
import { Toaster } from "../../../shared/services/toaster";
import { ListService } from "../../../shared/services/list-service";
import { ListSummary } from "../../../shared/models/list-summary";
import { ConfirmationModalController } from "../../../../confirmation-modal-controller";

@autoinject()
@containerless
export class ListLabel {
    private _listService: ListService;
    private _modalController: ConfirmationModalController;
    private _toaster: Toaster;
    private _userId: string;

    @bindable className: string;
    @bindable label: string;
    @bindable list: ListSummary;
    @bindable click;
    @bindable delete;

    constructor(listService: ListService, modalController: ConfirmationModalController, toaster: Toaster) {
        this._userId = localStorage.getItem("user_id");
        this._listService = listService;
        this._modalController = modalController;
        this._toaster = toaster;
    }

    bind() {
        if (!this.label && this.list) {
            this.label = this.list.name;
        }
    }

    clickList() {
        this.click({ list: this.list });
    }

    deleteList() {
        this._modalController.openModal(async () => {
            try {
                const listDeleted = await this._listService.delete(this._userId, this.list.id);
                if (!listDeleted) {
                    throw new Error();
                }

                this.delete({ list: this.list });
                this._toaster.showSuccess("lists.listDeleted");
            } catch(e) {
                this._toaster.showError("lists.listDeleted");
            }
        }, "delete-list");
    }
}
