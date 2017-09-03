import { autoinject } from "aurelia-dependency-injection";
import { Router, RouterConfiguration } from "aurelia-router";
import { I18N } from "aurelia-i18n";
import { PLATFORM } from "aurelia-pal";

@autoinject()
export class UserPage {
    private _i18n: I18N;

    router: Router;

    constructor(i18n: I18N) {
        this._i18n = i18n;
    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            { route: ["", "alerts"],    name: "alerts",   moduleId: PLATFORM.moduleName("./alerts/index"),   nav: true,  title: this._i18n.tr("alerts.title") },
            { route: "alerts/:alertId", name: "alert",    moduleId: PLATFORM.moduleName("./alert/index") },
            { route: "settings",        name: "settings", moduleId: PLATFORM.moduleName("./settings/index") },
        ]);

        this.router = router;
    }
}
