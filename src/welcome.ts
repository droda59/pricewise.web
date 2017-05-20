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

    isAuthenticated: boolean;
    router: Router;
    sources: Array<Source>;

    constructor(router: Router, userService: UserService, authenticationService: AuthenticationService, sourcesService: SourcesService) {
        this.router = router;
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
        try {
            await this._userService.get(profile.user_id);
        } catch(err) {
            if (err.status === 404) {
                var newUser = new User();
                newUser.userId = profile.user_id;
                newUser.firstName = profile.given_name;
                newUser.lastName = profile.family_name;
                newUser.email = profile.email;

                await this._userService.create(newUser);
            }
        }

        this.isAuthenticated = true;

        this.router.navigateToRoute("user");
    }
}
