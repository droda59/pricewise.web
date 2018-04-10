import { autoinject } from "aurelia-dependency-injection";
import { AureliaConfiguration } from "aurelia-configuration";
import { Store } from "../shared/models/store";
import { StoreService } from "../shared/services/store-service";
import { AuthenticationService } from "../shared/services/authentication-service";

@autoinject()
export class Welcome {
    private _storeService: StoreService;
    private _authenticationService: AuthenticationService;

    stores: Array<Store>;
    chromeAppUrl: string;

    constructor(storeService: StoreService, authenticationService: AuthenticationService, configure: AureliaConfiguration) {
        this._storeService = storeService;
        this._authenticationService = authenticationService;

        this.chromeAppUrl = configure.get("chrome");
    }

    activate(): void {
        this.stores = this._storeService.stores;
    }

    login(): void {
        this._authenticationService.login();
    }
}
