import { autoinject } from "aurelia-dependency-injection";
import { Router, RouterConfiguration, NavigationInstruction, Next } from "aurelia-router";
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
        config.addPostRenderStep({
            run(navigationInstruction: NavigationInstruction, next: Next) {
              if (navigationInstruction.router.isNavigatingNew) {
                window.scroll(0, 0);
              }
              return next();
            }
          });

        config.options.pushState = true;

        config.map([
            { route: ["", "welcome"],               name: "welcome",     moduleId: PLATFORM.moduleName("./homepage/index"),    nav: true },
            { route: "callback",                    name: "callback",    moduleId: PLATFORM.moduleName("./callback/index"),    nav: false, title: "callback.authenticating" },
            { route: "unsubscribe/:email/:alertId", name: "unsubscribe", moduleId: PLATFORM.moduleName("./unsubscribe/index"), nav: false },

            { route: "list/:listId",    name: "sharedlist", moduleId: PLATFORM.moduleName("./shared-list/index"),  nav: false },

            { route: "alerts",          name: "alerts",   moduleId: PLATFORM.moduleName("./alerts/index"),   authRoute: true },
            { route: "alert/:alertId/", name: "alert",    moduleId: PLATFORM.moduleName("./alert/index"),    authRoute: true, nav: false },
            { route: "alert/:alertId/list/:listId", name: "listalert",    moduleId: PLATFORM.moduleName("./alert/index"), nav: false },
            { route: "settings",        name: "settings", moduleId: PLATFORM.moduleName("./settings/index"), authRoute: true },
        ]);

        this.router = router;
    }
}
