import { autoinject } from "aurelia-dependency-injection";
// import { Router, RouterConfiguration } from "aurelia-router";
import { EventAggregator } from "aurelia-event-aggregator";
import { I18N, BaseI18N } from "aurelia-i18n";
// import { PLATFORM } from "aurelia-pal";
import { SharedListService } from "./services/shared-list-service";
import { UserAlertSummary } from "../app/shared/models/user-alert-summary";

@autoinject()
export class SharedListPage extends BaseI18N {
    // private _i18n: I18N;
    private _sharedListService: SharedListService;
    private _listId: string;

    userName: string;
    errorMessage: string;
    alerts: Array<UserAlertSummary> = [];

    constructor(
            sharedListService: SharedListService,
            i18n: I18N,
            element: Element,
            ea: EventAggregator) {
        super(i18n, element, ea);

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

            try {
                const list = await this._sharedListService.get(this._listId);
                if (!list) {
                    throw new Error();
                }

                this.userName = list.userName;
                this.alerts = list.alerts;

                routeConfig.navModel.title = list.name;
            } catch(e) {
                if (e.status === 404) {
                    this.errorMessage = "lists.errors.notFound";
                } else if (e.status === 401) {
                    this.errorMessage = "lists.errors.unauthorized";
                }
            }
        }
    }
}
