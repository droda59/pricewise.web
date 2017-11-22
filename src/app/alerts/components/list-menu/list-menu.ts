import { autoinject } from "aurelia-dependency-injection";
import { bindable } from "aurelia-framework";
import { Toaster } from "../../../shared/services/toaster";
import { ListService } from "../../../shared/services/list-service";
import { List } from "../../../shared/models/list";
import { ListSummary } from "../../../shared/models/list-summary";
import { UserAlertSummary } from "../../../shared/models/user-alert-summary";

@autoinject()
export class ListMenu {
    private _listService: ListService;
    private _toaster: Toaster;
    private _userId: string;

    isCreatingList: boolean;
    lists: Array<ListSummary> = new Array<ListSummary>();

    @bindable alerts: Array<UserAlertSummary>;
    @bindable selectedList: ListSummary;

    constructor(listService: ListService, toaster: Toaster) {
        this._userId = localStorage.getItem("user_id");
        this._listService = listService;
        this._toaster = toaster;
    }

    async bind(): Promise<void> {
        this.lists = await this._listService.getSummaries(this._userId);
    }

    async createList(name: string, alerts: Array<UserAlertSummary>): Promise<void> {
        this.isCreatingList = true;

        try {
            var list = new List();
            list.name = name;
            list.alerts = alerts;

            const newList = await this._listService.create(this._userId, list);
            if (!newList) {
                throw new Error();
            }

            this.lists.push(newList);

            this._toaster.showSuccess("lists.listCreated");
        } catch(e) {
            this._toaster.showError("lists.listCreated");
        } finally {
            this.isCreatingList = false;
        }
    }

    filterList(list?: ListSummary): void {
        if (!list && this.selectedList != null) {
            this.selectedList = null;
        } else if (this.selectedList != list) {
            this.selectedList = list;
        }
    }

    deleteList(list: ListSummary): void {
        this.lists.remove(list);
        this.filterList();
    }

    showModal(modalIdentifier: string): void {
        $(`.ui.dimmer .overlay.modal.${modalIdentifier}`).modal("show");
    }

    removeModal(modalIdentifier: string): void {
        $(`.ui.dimmer .overlay.modal.${modalIdentifier}`).modal("hide");
    }
}
