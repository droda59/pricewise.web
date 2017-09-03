import { autoinject } from "aurelia-dependency-injection";
import { Router, RouterConfiguration } from "aurelia-router";
import { EventAggregator } from "aurelia-event-aggregator";
import { BaseI18N, I18N } from "aurelia-i18n";
import { PLATFORM } from "aurelia-pal";

@autoinject()
export class SettingsPage extends BaseI18N {
    private _i18n: I18N;

    router: Router;

    constructor(i18n: I18N, element: Element, ea: EventAggregator) {
        super(i18n, element, ea);
        
        this._i18n = i18n;
    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = this._i18n.tr("settings.title");
        config.map([
            { route: ["", "alert"], name: "alert",   moduleId: PLATFORM.moduleName("./alert/index"),   nav: true, title: this._i18n.tr("settings.alerts.title") },
            { route: "account",     name: "account", moduleId: PLATFORM.moduleName("./account/index"), nav: true, title: this._i18n.tr("settings.account.title") },
        ]);

        this.router = router;
    }
}
