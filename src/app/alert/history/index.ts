import { autoinject } from "aurelia-dependency-injection";
import { EventAggregator } from "aurelia-event-aggregator";
import { BaseI18N, I18N } from "aurelia-i18n";
import { ProductHistory } from "../../shared/models/product-history";
import { AlertService } from "../../shared/services/alert-service";
import { SharedListService } from "../../../shared-list/services/shared-list-service";

@autoinject()
export class History extends BaseI18N {
    private _alertService: AlertService;
    private _sharedListService: SharedListService;
    private _userId: string;
    private _alertId: string;

    isReadOnly: boolean = false;
    alertHistory: Array<ProductHistory>;

    constructor(alertService: AlertService, sharedListService: SharedListService, i18n: I18N, element: Element, ea: EventAggregator) {
        super(i18n, element, ea);

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
