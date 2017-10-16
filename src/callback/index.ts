import { autoinject } from "aurelia-dependency-injection";
import { AuthenticationService } from "../shared/services/authentication-service";

@autoinject()
export class Callback {
    constructor(authService: AuthenticationService) {
        authService.handleAuthentication();
    }
}
