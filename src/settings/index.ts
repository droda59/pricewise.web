import { autoinject } from "aurelia-dependency-injection";
import { Router, RouterConfiguration } from "aurelia-router";
import { PLATFORM } from "aurelia-pal";

@autoinject()
export class SettingsPage {
    router: Router;

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = "settings.title";
        config.map([
            { route: ["", "alert"], name: "alert",   moduleId: PLATFORM.moduleName("./alert/index"),   nav: true, title: "settings.alerts.title" },
            { route: "account",     name: "account", moduleId: PLATFORM.moduleName("./account/index"), nav: true, title: "settings.account.title" },
        ]);

        this.router = router;
    }
}
