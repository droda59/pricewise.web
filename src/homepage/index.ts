import { autoinject } from "aurelia-dependency-injection";
import { AureliaConfiguration } from "aurelia-configuration";
import { Store } from "../shared/models/store";
import { StoreService } from "../shared/services/store-service";

@autoinject()
export class Welcome {
    private _storeService: StoreService;

    stores: Array<Store>;
    chromeAppUrl: string;

    constructor(storeService: StoreService, configure: AureliaConfiguration) {
        this._storeService = storeService;
        this.chromeAppUrl = configure.get("chrome");
    }

    activate(): void {
        this.stores = this._storeService.stores;
    }
}
