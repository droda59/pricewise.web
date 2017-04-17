import { Router, RouterConfiguration } from "aurelia-router";
import { PLATFORM } from "aurelia-pal";

export class UserPage {
    router: Router;

    heading = "Child Router";

    configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            { route: ["", "alerts"],    name: "alerts",   moduleId: PLATFORM.moduleName("./alerts"),   nav: true,  title: "Alerts" },
            { route: "alerts/:alertId", name: "alert",    moduleId: PLATFORM.moduleName("./alert") },
            { route: "account",         name: "account",  moduleId: PLATFORM.moduleName("./account"),  nav: true,  title: "Account" },
            { route: "settings",        name: "settings", moduleId: PLATFORM.moduleName("./settings"), nav: true,  title: "Settings" },
        ]);

        this.router = router;
    }
}
