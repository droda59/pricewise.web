import { autoinject } from "aurelia-dependency-injection";
import { bindable } from "aurelia-framework";
import { StoreService } from "../services/store-service";
import { Store } from "../models/store";
import { Modal } from "../modal";

@autoinject()
export class AddProductModal extends Modal {
    private _storeService: StoreService;

    newAlertUrl: string;
    stores: Array<Store>;

    @bindable isWorking: boolean;
    @bindable add;

    constructor(storeService: StoreService) {
        super();

        this._storeService = storeService;
    }

    bind(): void {
        this.stores = this._storeService.stores;
    }

    createProduct() {
        this.add({ newAlertUrl: this.newAlertUrl });
        this.close();
    }

    protected reset(): void {
        this.newAlertUrl = undefined;
    }
}
