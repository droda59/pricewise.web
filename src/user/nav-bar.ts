import { autoinject } from "aurelia-dependency-injection";
import { AuthenticationService } from "../services/authentication-service";

@autoinject()
export class NavBar {
    private _authenticationService: AuthenticationService;

    isAuthenticated: boolean;

    constructor(authenticationService: AuthenticationService) {
        this._authenticationService = authenticationService;
    }

    async activate(): Promise<void> {
        this.isAuthenticated = this._authenticationService.isAuthenticated();
    }

    attached(): void {
        $(".ui.dropdown").dropdown();
    }

    logout(): void {
        this._authenticationService.logout();
    }
}