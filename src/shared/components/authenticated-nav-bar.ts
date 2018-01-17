import { autoinject } from "aurelia-dependency-injection";
import { containerless } from "aurelia-framework";
import { Router } from "aurelia-router";
import { I18N } from "aurelia-i18n";
import { AuthenticationService } from "../services/authentication-service";

@autoinject()
@containerless
export class AuthenticatedNavBar {
    private _authenticationService: AuthenticationService;
    private _i18n: I18N;
    private _router: Router;

    constructor(authenticationService: AuthenticationService, i18n: I18N, router: Router) {
        this._authenticationService = authenticationService;
        this._i18n = i18n;
        this._router = router;
    }

    logout(): void {
        this._authenticationService.logout();

        this._router.navigateToRoute("welcome");
    }

    changeLanguage(): void {
        var language = this._i18n.tr("otherLanguageCode");
        this._i18n.setLocale(language);
    }
}
