import { bindable } from "aurelia-framework";
import { autoinject } from "aurelia-dependency-injection";
import { Router, RouterConfiguration } from "aurelia-router";
import { EventAggregator } from "aurelia-event-aggregator";
import { BaseI18N, I18N } from "aurelia-i18n";
import { PLATFORM } from "aurelia-pal";
import { AlertService } from "../shared/services/alert-service";
import { SharedListService } from "../../shared-list/services/shared-list-service";
import { Toaster } from "../shared/services/toaster";

@autoinject()
export class AlertPage extends BaseI18N {
    private _alertService: AlertService;
    private _sharedListService: SharedListService;
    private _i18n: I18N;
    private _toaster: Toaster;
    private _userId: string;
    private _alertId: string;

    @bindable title: string;

    isActive: boolean;
    imageUrl: string;
    router: Router;

    constructor(alertService: AlertService, sharedListService: SharedListService, toaster: Toaster, i18n: I18N, element: Element, ea: EventAggregator) {
        super(i18n, element, ea);

        this._alertService = alertService;
        this._sharedListService = sharedListService;
        this._i18n = i18n;
        this._toaster = toaster;
    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            { route: ["", "sources"], name: "sources",  moduleId: PLATFORM.moduleName("./sources/index"), nav: true, title: this._i18n.tr("alert.sources.title") },
            { route: "history",       name: "history",  moduleId: PLATFORM.moduleName("./history/index"), nav: true, title: this._i18n.tr("alert.history.title") },
        ]);

        this.router = router;
    }

    async activate(route, routeConfig): Promise<void> {
        if (route.alertId) {
            this._userId = localStorage.getItem("user_id");
            this._alertId = route.alertId;

            var alert;
            if (route.listId) {
                alert = await this._sharedListService.getAlertSummary(route.listId, this._alertId);
            } else {
                alert = await this._alertService.getSummary(this._userId, this._alertId);
            }

            this.title = alert.title;
            this.isActive = alert.isActive;
            this.imageUrl = alert.imageUrl;

            var image = new Image();
            image.onerror = () => {
                image.onerror = null;
                this.imageUrl = "/images/pricewise-logo.png";
            };
            image.src = this.imageUrl;

            routeConfig.navModel.title = alert.title;
        }

        // TODO Return to the list if there is no alertId
    }

    attached() {
        $(".ui.checkbox").checkbox();
    }

    async titleChanged(newValue: string, oldValue: string): Promise<void> {
        if (newValue != oldValue) {
            try {
                var currentAlert = await this._alertService.getSummary(this._userId, this._alertId);
                currentAlert.title = this.title;

                var updatedAlert = await this._alertService.updateSummary(this._userId, currentAlert);
                if (!updatedAlert) {
                    throw new Error();
                }

                this._toaster.showSuccess("alert.alertSaved");
            } catch(e) {
                this._toaster.showError("alert.alertSaved");
            }
        }
    }

    async changeActive(): Promise<void> {
        try {
            const alertUpdated = await this._alertService.activate(this._userId, this._alertId, this.isActive);
            if (!alertUpdated) {
                throw new Error();
            }

            this._toaster.showSuccess("alert.alertSaved");
        } catch(e) {
            this._toaster.showError("alert.alertSaved");
        }
    }
}
