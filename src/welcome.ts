import { autoinject } from "aurelia-dependency-injection";
import { Router } from "aurelia-router";
import Auth0Lock from "auth0-lock";
import { UserService } from "./services/user-service";
import { User } from "./models/user";

@autoinject()
export class Welcome {
    private _lock: Auth0LockStatic;
    private _userService: UserService;

    isAuthenticated: boolean = false;
    router: Router;

    constructor(router: Router, userService: UserService) {
        this.router = router;
        this._userService = userService;

        this._lock = new Auth0Lock(
            "7ICWS6d4sFffNPX02SN5BDcUHZsbOCv0",
            "price-alerts.auth0.com", 
            {
                auth: {
                    redirect: false
                }
            }
        );

        this._lock.on("authenticated", (authResult: any) => {
            this._lock.getUserInfo(authResult.accessToken, async (error: Auth0Error, profile: Auth0UserProfile) => {
                if (error) {
                    return;
                }

                let repoUser: User;

                try {
                    repoUser = await userService.get(profile.user_id);
                } catch(e) {
                    var newUser = new User();
                    newUser.userId = profile.user_id;
                    newUser.firstName = profile.given_name;
                    newUser.lastName = profile.family_name;
                    newUser.email = profile.email;

                    repoUser = await userService.create(newUser);
                }

                this.isAuthenticated = true;
                localStorage.setItem("accessToken", authResult.accessToken);
                localStorage.setItem("profile", JSON.stringify(profile));
                this._lock.hide();

                this.router.navigateToRoute("user-page");
            });
        });
    }

    login(): void {
        this._lock.show();
    }

    logout(): void {
        localStorage.removeItem("profile");
        localStorage.removeItem("id_token");
        this.isAuthenticated = false;

        this._lock.logout({
            returnTo: "http://localhost:8080/#/"
        });
    }
}
