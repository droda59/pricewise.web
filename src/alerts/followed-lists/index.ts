import { autoinject } from "aurelia-dependency-injection";
import { bindable } from "aurelia-framework";
import { Router } from "aurelia-router";
import { EventAggregator } from "aurelia-event-aggregator";
import { Toaster } from "../../shared/services/toaster";
import { ConfirmationModal } from "../../shared/components/confirmation-modal";
import { ConfirmationModalController } from "../../confirmation-modal-controller";
import { ListService } from "../../shared/services/list-service";
import { SharedListService } from "../../shared-list/services/shared-list-service";
import { UserAlertSummary } from "../../shared/models/user-alert-summary";
import { List } from "../../shared/models/list";

@autoinject()
export class FollowedLists {
    private _sharedListService: SharedListService;
    private _router: Router;
    private _listService: ListService;
    private _ea: EventAggregator;
    private _modalController: ConfirmationModalController;
    private _toaster: Toaster;
    private _userId: string;

    confirmUnfollowListModal: ConfirmationModal;
    isUpdating: boolean;
    alerts: Array<UserAlertSummary> = new Array<UserAlertSummary>();
    lists: Array<List> = new Array<List>();

    @bindable currentList: List = undefined;

    constructor(
            listService: ListService,
            sharedListService: SharedListService,
            router: Router,
            modalController: ConfirmationModalController,
            toaster: Toaster,
            ea: EventAggregator) {
        this._userId = localStorage.getItem("user_id");

        this._ea = ea;
        this._listService = listService;
        this._sharedListService = sharedListService;
        this._router = router;
        this._modalController = modalController;
        this._toaster = toaster;
    }

    async activate(route): Promise<void> {
        this.lists = await this._listService.getWatchedSummaries(this._userId);

        if (this.lists.length) {
            this.currentList = this.lists[0];
            await this._updateSelectedList(this.currentList);
        }
    }

    navigateToSharedAlert(alert: UserAlertSummary): void {
        this._router.navigateToRoute("listalert", { alertId: alert.id, listId: this.currentList.id });
    }

    detached() {
        $(".ui.modals.page.dimmer").remove();
    }

    confirmUnfollowList(list: List): void {
        this._modalController.confirm(this.confirmUnfollowListModal, async () => await this._unfollowList(list));
    }

    private async _unfollowList(list: List) {
        this.isUpdating = true;

        try {
            const listDeleted = await this._listService.unfollow(this._userId, list.id);
            if (!listDeleted) {
                throw new Error();
            }

            this.lists.remove(list);
            this.currentList = undefined;
            this._ea.publish("list:unfollowed", { list: list });

            this._toaster.showSuccess("followedLists.listUnfollowed");
        } catch(e) {
            this._toaster.showError("followedLists.listUnfollowed");
        } finally {
            this.isUpdating = false;
        }
    }

    async currentListChanged(newValue: List, oldValue: List) {
        if (newValue != oldValue) {
            await this._updateSelectedList(newValue);
        }
    }

    private async _updateSelectedList(list: List): Promise<void> {
        this.isUpdating = true;

        var selectedList = await this._sharedListService.get(list.id);
        this.alerts = selectedList.alerts;

        this.isUpdating = false;
    }
}
