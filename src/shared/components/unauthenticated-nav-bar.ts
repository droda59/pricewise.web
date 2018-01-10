import { autoinject } from "aurelia-dependency-injection";
import { Router } from "aurelia-router";
import { EventAggregator } from "aurelia-event-aggregator";
import { I18N, BaseI18N } from "aurelia-i18n";
import { AureliaConfiguration } from "aurelia-configuration";
import { AuthenticationService } from "../services/authentication-service";
import auth0 from "auth0-js";

@autoinject()
export class UnauthenticatedNavBar extends BaseI18N {
    private _authenticationService: AuthenticationService;
    private _router: Router;
    private _i18n: I18N;

    isAuthenticated: boolean;
    chromeAppUrl: string;

    constructor(
            router: Router,
            authenticationService: AuthenticationService,
            configure: AureliaConfiguration,
            i18n: I18N,
            element: Element,
            ea: EventAggregator) {
        super(i18n, element, ea);

        this._authenticationService = authenticationService;
        this._i18n = i18n;
        this.chromeAppUrl = configure.get("chrome");
    }

    activate(): void {
        this.isAuthenticated = this._authenticationService.isAuthenticated();
    }

    login(): void {
        this._authenticationService.login();
    }

    logout(): void {
        this._authenticationService.logout();
    }

    changeLanguage(): void {
        var language = this._i18n.tr("otherLanguageCode");
        this._i18n.setLocale(language);
    }
}
