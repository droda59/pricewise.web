import { autoinject } from "aurelia-dependency-injection";
import { ProductHistory } from "../../shared/models/product-history";
import { AlertService } from "../../shared/services/alert-service";
import { SharedListService } from "../../shared-list/services/shared-list-service";

@autoinject()
export class History {
    private _alertService: AlertService;
    private _sharedListService: SharedListService;
    private _userId: string;
    private _alertId: string;

    isReadOnly: boolean = false;
    alertHistory: Array<ProductHistory>;

    constructor(alertService: AlertService, sharedListService: SharedListService) {
        this._alertService = alertService;
        this._sharedListService = sharedListService;
    }

    async activate(route): Promise<void> {
        if (route.alertId) {
            this._userId = localStorage.getItem("user_id");
            this._alertId = route.alertId;

            var alertHistory;
            if (route.listId === "history" || !route.listId) {
                alertHistory = await this._alertService.getHistory(this._userId, this._alertId);
            } else {
                this.isReadOnly = true;
                alertHistory = await this._sharedListService.getHistory(route.listId, this._alertId);
            }

            this.alertHistory = alertHistory;
        }
    }
}
