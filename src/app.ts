import { autoinject } from "aurelia-dependency-injection";
import { Aurelia } from "aurelia-framework";
import { Router, RouterConfiguration } from "aurelia-router";
import { EventAggregator } from "aurelia-event-aggregator";
import { I18N } from "aurelia-i18n";
import { PLATFORM } from "aurelia-pal";
import { AuthorizeStep } from "./authorize-step";

@autoinject()
export class App {
    router: Router;

    constructor(i18n: I18N, ea: EventAggregator) {
        let language = localStorage.getItem("language");
        if (language) {
            i18n.setLocale(language);
        } else {
            localStorage.setItem("language", i18n.getLocale());
        }

        ea.subscribe("i18n:locale:changed", payload => {
            localStorage.setItem("language", i18n.getLocale());
        });
    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = "PriceWise";
        config.addPipelineStep("authorize", AuthorizeStep);
        config.options.pushState = true;

        config.map([
            { route: ["", "welcome"], name: "welcome",    moduleId: PLATFORM.moduleName("./homepage/index"),     nav: true },
            { route: "callback",      name: "callback",   moduleId: PLATFORM.moduleName("./callback/index"),     nav: false, title: "welcome.authenticating" },

            { route: "list/:listId",  name: "sharedlist", moduleId: PLATFORM.moduleName("./shared-list/index"),  nav: false },

            { route: "user/alerts",         name: "alerts",   moduleId: PLATFORM.moduleName("./app/alerts/index"),   authRoute: true },
            { route: "user/alert/:alertId/:listId?", name: "alert",    moduleId: PLATFORM.moduleName("./app/alert/index"),    authRoute: true, nav: false },
            { route: "user/settings",       name: "settings", moduleId: PLATFORM.moduleName("./app/settings/index"), authRoute: true },
        ]);

        this.router = router;
    }
}
