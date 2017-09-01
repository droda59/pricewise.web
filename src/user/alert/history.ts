import { autoinject } from "aurelia-dependency-injection";
import { EventAggregator } from "aurelia-event-aggregator";
import { BaseI18N, I18N } from "aurelia-i18n";
import { AlertService } from "../../services/alert-service";
import { ProductHistory } from "../../models/product-history";

@autoinject()
export class History extends BaseI18N {
    private _alertService: AlertService;
    private _userId: string;
    private _alertId: string;

    alertHistory: Array<ProductHistory>;

    constructor(alertService: AlertService, i18n: I18N, element: Element, ea: EventAggregator) {
        super(i18n, element, ea);
        
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