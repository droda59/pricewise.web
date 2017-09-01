import { autoinject } from "aurelia-dependency-injection";
import { Router } from "aurelia-router";
import { EventAggregator } from "aurelia-event-aggregator";
import { I18N, BaseI18N } from "aurelia-i18n";
import { UserService } from "./services/user-service";
import { AuthenticationService } from "./services/authentication-service";
import { SourcesService } from "./services/sources-service";
import { User } from "./models/user";
import { Source } from "./models/source";

@autoinject()
export class Welcome extends BaseI18N {
    private _userService: UserService;
    private _authenticationService: AuthenticationService;
    private _sourcesService: SourcesService;
    private _router: Router;
    private _i18n: I18N;

    isAuthenticating: boolean;
    isAuthenticated: boolean;
    sources: Array<Source>;

    constructor(
            router: Router, 
            userService: UserService,
            authenticationService: AuthenticationService, 
            sourcesService: SourcesService,
            i18n: I18N, 
            element: Element, 
            ea: EventAggregator) {
        super(i18n, element, ea);

        this._router = router;
        this._userService = userService;
        this._authenticationService = authenticationService;
        this._sourcesService = sourcesService;
        this._i18n = i18n;
    }

    activate(): void {
        this.isAuthenticated = this._authenticationService.isAuthenticated();
        this.sources = this._sourcesService.sources;
    }

    login(): void {
        this._authenticationService.login(this.onAuthenticated.bind(this));
    }

    logout(): void {
        this.isAuthenticated = false;

        this._authenticationService.logout();
    }

    changeLanguage(): void {
        var language = this._i18n.tr("otherLanguageCode");
        this._i18n.setLocale(language);
    }

    private async onAuthenticated(profile: Auth0UserProfile): Promise<void> {
        this.isAuthenticating = true;

        var user;
        var navigateTo = "user";
        
        try {
            user = await this._userService.get(profile.user_id);
            if (!user.firstName) {
                navigateTo = "user/settings/account";
            }
        } catch(err) {
            if (err.status === 404) {
                var newUser = new User();
                newUser.userId = profile.user_id;
                newUser.firstName = profile.given_name;
                newUser.lastName = profile.family_name;
                newUser.email = profile.email;

                user = await this._userService.create(newUser);
                if (!user.firstName) {
                    navigateTo = "user/settings/account";
                }
            }
        }

        this.isAuthenticating = false;
        this.isAuthenticated = true;

        this._router.navigate(navigateTo);
    }
}
