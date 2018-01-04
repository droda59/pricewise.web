import { autoinject } from "aurelia-dependency-injection";
// import { Router, RouterConfiguration } from "aurelia-router";
// import { I18N } from "aurelia-i18n";
// import { PLATFORM } from "aurelia-pal";
import { SharedListService } from "./services/shared-list-service";
import { UserAlertSummary } from "../app/shared/models/user-alert-summary";

@autoinject()
export class SharedListPage {
    // private _i18n: I18N;
    private _sharedListService: SharedListService;
    private _listId: string;

    userName: string;
    alerts: Array<UserAlertSummary> = [];

    constructor(/*i18n: I18N, */sharedListService: SharedListService) {
        // this._i18n = i18n;
        this._sharedListService = sharedListService;
    }

    // configureRouter(config: RouterConfiguration, router: Router) {
        // config.map([
        //     { route: "alerts/:alertId", name: "alert",    moduleId: PLATFORM.moduleName("../app/alert/index") },
        // ]);
    // }

    async activate(route, routeConfig): Promise<void> {
        if (route.listId) {
            this._listId = route.listId;

            var list = await this._sharedListService.get(this._listId);
            this.userName = list.userName;
            this.alerts = list.alerts;

            routeConfig.navModel.title = list.name;
        }
    }
}
