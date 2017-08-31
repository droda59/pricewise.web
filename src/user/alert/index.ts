import { bindable } from "aurelia-framework";
import { autoinject } from "aurelia-dependency-injection";
import { Router, RouterConfiguration } from "aurelia-router";
import { I18N } from "aurelia-i18n";
import { PLATFORM } from "aurelia-pal";
import { AlertService } from "../../services/alert-service";
import { Toaster } from "../../services/toaster";

@autoinject()
export class AlertPage {
    private _alertService: AlertService;
    private _i18n: I18N;
    private _toaster: Toaster;
    private _userId: string;
    private _alertId: string;

    @bindable title: string;
    
    isActive: boolean;
    imageUrl: string;
    router: Router;

    constructor(alertService: AlertService, i18n: I18N, toaster: Toaster) {
        this._alertService = alertService;
        this._i18n = i18n;
        this._toaster = toaster;
    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            { route: ["", "sources"], name: "sources",  moduleId: PLATFORM.moduleName("./sources"),  nav: true, title: this._i18n.tr("alert.sources.title") },
            { route: "history",       name: "history",  moduleId: PLATFORM.moduleName("./history"),  nav: true, title: this._i18n.tr("alert.history.title") },
        ]);

        this.router = router;
    }

    async activate(route, routeConfig): Promise<void> {
        if (route.alertId) {
            this._userId = localStorage.getItem("user-id");
            this._alertId = route.alertId;

            var alert = await this._alertService.get(this._userId, this._alertId);

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
            await this.updateAlert();
        }
    }

    async changeActive(): Promise<void> {
        await this.updateAlert();
    }

    private async updateAlert(): Promise<void> {
        try {
            var currentAlert = await this._alertService.get(this._userId, this._alertId);
            currentAlert.title = this.title;
            currentAlert.isActive = this.isActive;

            var updatedAlert = await this._alertService.update(this._userId, currentAlert);

            if (updatedAlert) {
                this.title = updatedAlert.title;
                this.isActive = updatedAlert.isActive;
            } else {
                throw new Error();
            }

            this._toaster.showSuccess("alert.alertSaved");
        } catch(e) {
            this._toaster.showError("alert.alertSaved");
        }
    }
}
