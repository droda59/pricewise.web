import { autoinject } from "aurelia-dependency-injection";
import { AuthenticationService } from "../shared/services/authentication-service";

@autoinject()
export class Callback {
    // private _auth: AuthenticationService;

    constructor(authService: AuthenticationService) {
        // this._auth = authService;
        authService.handleAuthentication();
    }
}
