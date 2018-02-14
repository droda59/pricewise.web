import { autoinject } from "aurelia-dependency-injection";
import { Router, RouterConfiguration } from "aurelia-router";
import { PLATFORM } from "aurelia-pal";
import { ListService } from "../shared/services/list-service";

@autoinject()
export class Alerts {
    private _listService: ListService;
    private _userId: string;

    router: Router;
    showMenu: boolean;

    constructor(listService: ListService) {
        this._userId = localStorage.getItem("user_id");
        this._listService = listService;
    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = "alerts.title";
        config.map([
            { route: ["", "my-alerts"], name: "my-alerts",  moduleId: PLATFORM.moduleName("./my-alerts/index"),      nav: true, title: "alerts.myAlerts" },
            { route: "my-followed-lists",       name: "my-followed-lists",  moduleId: PLATFORM.moduleName("./followed-lists/index"), nav: true, title: "followedLists.title" },
        ]);

        this.router = router;
    }

    async activate(): Promise<void> {
        const watchedLists = await this._listService.getWatchedSummaries(this._userId);

        this.showMenu = !!watchedLists.length;
    }
 }
