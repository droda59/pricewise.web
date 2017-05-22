import { Router, RouterConfiguration } from "aurelia-router";
import { PLATFORM } from "aurelia-pal";
import { bindable } from "aurelia-framework";
import { autoinject } from "aurelia-dependency-injection";
import * as Toastr from "toastr";
import { AlertService } from "../../services/alert-service";

@autoinject()
export class AlertPage {
    private _alertService: AlertService;
    private _userId: string;
    private _alertId: string;

    @bindable title: string;
    
    isActive: boolean;
    router: Router;

    constructor(alertService: AlertService) {
        this._alertService = alertService;
    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            { route: ["", "sources"], name: "sources",  moduleId: PLATFORM.moduleName("./sources"),  nav: true, title: "Watched Sources" },
            { route: "history",       name: "history",  moduleId: PLATFORM.moduleName("./history"),  nav: true, title: "History" },
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

            routeConfig.navModel.title = alert.title;
        }
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
            }

            Toastr.success("Alert saved successfully!", "Success", { timeOut: 3000 });
        } catch(e) {
            Toastr.error("An error ocurred during the save.", "Error", { timeOut: 3000 });
        }
    }
}
