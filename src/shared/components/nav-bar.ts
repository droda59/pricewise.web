import { autoinject } from "aurelia-dependency-injection";
import { EventAggregator } from "aurelia-event-aggregator";
import { AuthenticationService } from "../services/authentication-service";

@autoinject()
export class NavBar {
    private _authenticationService: AuthenticationService;

    isAuthenticated: boolean;

    constructor(authenticationService: AuthenticationService, ea: EventAggregator) {
        this._authenticationService = authenticationService;

        ea.subscribe("auth:change", payload => {
            this.isAuthenticated = payload["authenticated"];
        });
    }

    bind(): void {
        this.isAuthenticated = this._authenticationService.isAuthenticated();
    }
}
