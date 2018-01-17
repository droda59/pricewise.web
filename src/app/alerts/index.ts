import { autoinject } from "aurelia-dependency-injection";
import { Router, RouterConfiguration } from "aurelia-router";
import { EventAggregator } from "aurelia-event-aggregator";
import { PLATFORM } from "aurelia-pal";
import { I18N, BaseI18N } from "aurelia-i18n";
import { ListService } from "../shared/services/list-service";

@autoinject()
export class Alerts extends BaseI18N {
    private _listService: ListService;
    private _i18n: I18N;
    private _userId: string;

    router: Router;
    showMenu: boolean;

    constructor(
            listService: ListService,
            i18n: I18N,
            element: Element,
            ea: EventAggregator) {
        super(i18n, element, ea);

        this._userId = localStorage.getItem("user_id");
        this._listService = listService;
        this._i18n = i18n;
    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = this._i18n.tr("alerts.title");
        config.map([
            { route: ["", "myalerts"], name: "myalerts",  moduleId: PLATFORM.moduleName("./my-alerts/index"),      nav: true, title: "alerts.myAlerts" },
            { route: "followed",       name: "followed",  moduleId: PLATFORM.moduleName("./followed-lists/index"), nav: true, title: "followedLists.title" },
        ]);

        this.router = router;
    }

    async activate(): Promise<void> {
        const watchedLists = await this._listService.getWatchedSummaries(this._userId);

        this.showMenu = !!watchedLists.length;
    }
 }
