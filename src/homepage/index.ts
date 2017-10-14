import { autoinject } from "aurelia-dependency-injection";
import { Router } from "aurelia-router";
import { EventAggregator } from "aurelia-event-aggregator";
import { I18N, BaseI18N } from "aurelia-i18n";
import { AureliaConfiguration } from "aurelia-configuration";
import { Source } from "../shared/models/source";
import { AuthenticationService } from "../shared/services/authentication-service";
import { SourcesService } from "../shared/services/sources-service";
import auth0 from "auth0-js";

@autoinject()
export class Welcome extends BaseI18N {
    private _authenticationService: AuthenticationService;
    private _sourcesService: SourcesService;
    private _router: Router;
    private _i18n: I18N;

    isAuthenticated: boolean;
    sources: Array<Source>;
    chromeAppUrl: string;

    constructor(
            router: Router,
            authenticationService: AuthenticationService,
            sourcesService: SourcesService,
            configure: AureliaConfiguration,
            i18n: I18N,
            element: Element,
            ea: EventAggregator) {
        super(i18n, element, ea);

        ea.subscribe("authChange", authState => {
            this.isAuthenticated = authState.authenticated;
        });

        this._router = router;
        this._authenticationService = authenticationService;
        this._sourcesService = sourcesService;
        this._i18n = i18n;
        this.chromeAppUrl = configure.get("chrome");
    }

    activate(): void {
        this.isAuthenticated = this._authenticationService.isAuthenticated();
        this.sources = this._sourcesService.sources;

        if (this.isAuthenticated) {
            this._router.navigateToRoute("user");
        }
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
