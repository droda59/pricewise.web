import { Router, RouterConfiguration } from "aurelia-router";
import { PLATFORM } from "aurelia-pal";

export class SettingsPage {
    router: Router;

    configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            { route: ["", "alert"], name: "alert",   moduleId: PLATFORM.moduleName("./alert"),   nav: true, title: "Alert" },
            { route: "account",     name: "account", moduleId: PLATFORM.moduleName("./account"), nav: true, title: "Account" },
        ]);

        this.router = router;
    }
}
