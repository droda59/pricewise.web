import { bindable } from "aurelia-framework";
import { autoinject } from "aurelia-dependency-injection";
import { Router, RouterConfiguration } from "aurelia-router";
import { PLATFORM } from "aurelia-pal";
import { AlertService } from "../shared/services/alert-service";
import { SharedListService } from "../shared-list/services/shared-list-service";
import { Toaster } from "../shared/services/toaster";

@autoinject()
export class AlertPage {
    private _alertService: AlertService;
    private _sharedListService: SharedListService;
    private _toaster: Toaster;
    private _userId: string;
    private _alertId: string;

    @bindable title: string;

    isReadOnly: boolean = false;
    isActive: boolean;
    imageUrl: string;
    router: Router;

    constructor(alertService: AlertService, sharedListService: SharedListService, toaster: Toaster) {
        this._alertService = alertService;
        this._sharedListService = sharedListService;
        this._toaster = toaster;
    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            { route: ["", "products"], name: "products",  moduleId: PLATFORM.moduleName("./products/index"), nav: true, title: "alert.products.title" },
            { route: "history",       name: "history",  moduleId: PLATFORM.moduleName("./history/index"), nav: true, title: "alert.history.title" },
        ]);

        this.router = router;
    }

    async activate(route, routeConfig): Promise<void> {
        if (route.alertId) {
            this._alertId = route.alertId;

            var alert;
            if (route.listId) {
                this.isReadOnly = true;
                alert = await this._sharedListService.getAlertSummary(route.listId, this._alertId);
            } else {
                this._userId = localStorage.getItem("user_id");
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
        if (!this.isReadOnly && newValue != oldValue) {
            try {
                // TODO Pourquoi on re-get?
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
        if (!this.isReadOnly) {
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
}
