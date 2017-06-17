import { autoinject } from "aurelia-dependency-injection";
import { Router } from "aurelia-router";
import { UserService } from "./services/user-service";
import { AuthenticationService } from "./services/authentication-service";
import { SourcesService } from "./services/sources-service";
import { User } from "./models/user";
import { Source } from "./models/source";

@autoinject()
export class Welcome {
    private _userService: UserService;
    private _authenticationService: AuthenticationService;
    private _sourcesService: SourcesService;
    private _router: Router;

    isAuthenticating: boolean;
    isAuthenticated: boolean;
    sources: Array<Source>;

    constructor(router: Router, userService: UserService, authenticationService: AuthenticationService, sourcesService: SourcesService) {
        this._router = router;
        this._userService = userService;
        this._authenticationService = authenticationService;
        this._sourcesService = sourcesService;
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

    private async onAuthenticated(profile: Auth0UserProfile): Promise<void> {
        this.isAuthenticating = true;

        var user;
        var navigateTo = "user";
        
        try {
            user = await this._userService.get(profile.user_id);
            if (!user.given_name) {
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
                if (!user.given_name) {
                    navigateTo = "user/settings/account";
                }
            }
        }

        this.isAuthenticating = false;
        this.isAuthenticated = true;

        this._router.navigate(navigateTo);
    }
}
