import { autoinject } from "aurelia-dependency-injection";
import { AlertService } from "../../services/alert-service";
import { ProductHistory } from "../../models/product-history";

@autoinject()
export class History {
    private _alertService: AlertService;
    private _userId: string;
    private _alertId: string;

    alertHistory: Array<ProductHistory>;

    constructor(alertService: AlertService) {
        this._alertService = alertService;
    }

    async activate(route): Promise<void> {
        if (route.alertId) {
            this._userId = localStorage.getItem("user-id");
            this._alertId = route.alertId;

            this.alertHistory = await this._alertService.getHistory(this._userId, this._alertId);

            var b = true;
        }
    }
}