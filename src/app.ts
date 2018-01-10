import { autoinject } from "aurelia-dependency-injection";
import { Aurelia } from "aurelia-framework";
import { Router, RouterConfiguration } from "aurelia-router";
import { EventAggregator } from "aurelia-event-aggregator";
import { I18N } from "aurelia-i18n";
import { PLATFORM } from "aurelia-pal";
import { AuthorizeStep } from "./authorize-step";

@autoinject()
export class App {
    private _i18n: I18N;

    router: Router;

    constructor(i18n: I18N, ea: EventAggregator) {
        this._i18n = i18n;

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
            { route: ["", "welcome"], name: "welcome",    moduleId: PLATFORM.moduleName("./homepage/index"),   nav: true },
            { route: "callback",      name: "callback",   moduleId: PLATFORM.moduleName("./callback/index"),   nav: false, title: this._i18n.tr("welcome.authenticating") },
            { route: "user",          name: "user",       moduleId: PLATFORM.moduleName("./app/index"),        nav: true, activationStrategy: "replace", authRoute: true },
            { route: "list/:listId",  name: "sharedlist", moduleId: PLATFORM.moduleName("./list/index"),       nav: false },
            { route: "user/settings", name: "settings", moduleId: PLATFORM.moduleName("./app/settings/index"), nav: false, authRoute: true },
        ]);

        this.router = router;
    }
}
