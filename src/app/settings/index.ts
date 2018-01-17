import { autoinject } from "aurelia-dependency-injection";
import { Router, RouterConfiguration } from "aurelia-router";
import { EventAggregator } from "aurelia-event-aggregator";
import { BaseI18N, I18N } from "aurelia-i18n";
import { PLATFORM } from "aurelia-pal";

@autoinject()
export class SettingsPage extends BaseI18N {
    router: Router;

    constructor(i18n: I18N, element: Element, ea: EventAggregator) {
        super(i18n, element, ea);
    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = "settings.title";
        config.map([
            { route: ["", "alert"], name: "alert",   moduleId: PLATFORM.moduleName("./alert/index"),   nav: true, title: "settings.alerts.title" },
            { route: "account",     name: "account", moduleId: PLATFORM.moduleName("./account/index"), nav: true, title: "settings.account.title" },
        ]);

        this.router = router;
    }
}
