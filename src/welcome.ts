import { autoinject } from "aurelia-dependency-injection";
import { Router } from "aurelia-router";
import { UserService } from "./services/user-service";
import { AuthenticationService } from "./services/authentication-service";
import { User } from "./models/user";

@autoinject()
export class Welcome {
    private _userService: UserService;
    private _authenticationService: AuthenticationService;

    isAuthenticated: boolean;
    router: Router;

    constructor(router: Router, userService: UserService, authenticationService: AuthenticationService) {
        this.router = router;
        this._userService = userService;
        this._authenticationService = authenticationService;
    }

    activate(): void {
        this.isAuthenticated = this._authenticationService.isAuthenticated();
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
        } catch(e) {
            var newUser = new User();
            newUser.userId = profile.user_id;
            newUser.firstName = profile.given_name;
            newUser.lastName = profile.family_name;
            newUser.email = profile.email;

            await this._userService.create(newUser);
        }

        this.isAuthenticated = true;

        this.router.navigateToRoute("user");
    }
}
