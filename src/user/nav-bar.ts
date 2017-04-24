import { autoinject } from "aurelia-dependency-injection";
import { Router } from "aurelia-router";
import { UserService } from "../services/user-service";
import { AuthenticationService } from "../services/authentication-service";
import { User } from "../models/user";

@autoinject()
export class NavBar {
    private _userService: UserService;
    private _authenticationService: AuthenticationService;

    isAuthenticated: boolean;
    router: Router;
    user: User;

    constructor(router: Router, userService: UserService, authenticationService: AuthenticationService) {
        this.router = router;
        this._userService = userService;
        this._authenticationService = authenticationService;
    }

    async activate(): Promise<void> {
        this.isAuthenticated = this._authenticationService.isAuthenticated();

        this.user = await this._userService.get(localStorage.getItem("user-id"));
    }

    logout(): void {
        this._authenticationService.logout();
    }
}