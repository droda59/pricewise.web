import { autoinject } from "aurelia-dependency-injection";
import { Router } from "aurelia-router";
import { EventAggregator } from "aurelia-event-aggregator";
import { I18N, BaseI18N } from "aurelia-i18n";
import { Source } from "../shared/models/source";
import { AuthenticationService } from "../shared/services/authentication-service";
import { SourcesService } from "../shared/services/sources-service";
import auth0 from "auth0-js";

@autoinject()
export class Welcome extends BaseI18N {
    private _authenticationService: AuthenticationService;
    private _sourcesService: SourcesService;
    private _router: Router;

    sources: Array<Source>;

    constructor(
            router: Router,
            authenticationService: AuthenticationService,
            sourcesService: SourcesService,
            i18n: I18N,
            element: Element,
            ea: EventAggregator) {
        super(i18n, element, ea);

        this._router = router;
        this._authenticationService = authenticationService;
        this._sourcesService = sourcesService;
    }

    activate(): void {
        this.sources = this._sourcesService.sources;

        const isAuthenticated = this._authenticationService.isAuthenticated();
        if (isAuthenticated) {
            this._router.navigateToRoute("alerts");
        }
    }
}
