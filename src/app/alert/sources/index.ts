import { autoinject } from "aurelia-dependency-injection";
import { EventAggregator } from "aurelia-event-aggregator";
import { BaseI18N, I18N } from "aurelia-i18n";
import { AlertService } from "../../shared/services/alert-service";
import { ProductService } from "../../shared/services/product-service";
import { Toaster } from "../../shared/services/toaster";
import { AlertEntry } from "../../shared/models/alert-entry";
import { UserAlert } from "../../shared/models/user-alert";
import { ProductInfo } from "../../shared/models/product-info";
import { ConfirmationModalController } from "../../../confirmation-modal-controller";

@autoinject()
export class Sources extends BaseI18N {
    private _alertService: AlertService;
    private _productService: ProductService;
    private _modalController: ConfirmationModalController;
    private _toaster: Toaster;
    private _userId: string;
    private _alertId: string;

    alert: UserAlert;
    isSearchingProducts: boolean;
    isUpdatingAlert: boolean;
    isAddingSource: boolean;
    suggestedProducts: Array<ProductInfo> = new Array<ProductInfo>();

    constructor(
            alertService: AlertService, 
            productService: ProductService, 
            modalController: ConfirmationModalController, 
            toaster: Toaster,
            i18n: I18N, 
            element: Element, 
            ea: EventAggregator) {
        super(i18n, element, ea);

        this._alertService = alertService;
        this._productService = productService;
        this._modalController = modalController;
        this._toaster = toaster;
    }

    async activate(route): Promise<void> {
        if (route.alertId) {
            this._userId = localStorage.getItem("user-id");
            this._alertId = route.alertId;

            this.alert = await this._alertService.get(this._userId, this._alertId);

            this.searchForSameProducts();
        }
    }

    detached() {
        $(".ui.modals.page.dimmer").remove();
    }

    addSource(): void {
        $(".ui.dimmer .overlay.modal").modal("show");
    }

    removeModal(): void {
        $(".ui.dimmer .overlay.modal").modal("hide");
    }

    async addEntry(newEntryUrl: string): Promise<void> {
        this.isAddingSource = true; 

        var newEntry = new AlertEntry();
        newEntry.originalUrl = newEntryUrl;

        var alertToUpdate = new UserAlert(this.alert);
        alertToUpdate.entries.push(newEntry);

        try {
            var updatedAlert = await this._alertService.update(this._userId, alertToUpdate);
            if (updatedAlert) {
                // This might rebind everything, but we need it when we add an Entry. Maybe a dedicated route would help
                this.alert = updatedAlert;
                this.searchForSameProducts();
            } else {
                throw new Error();
            }

            this._toaster.showSuccess("alert.alertSaved");
        } catch(e) {
            var errorMessage = "";
            if (e.status === 404) {
                errorMessage = "errors.sourceNotSupported";
            } else if (e.status === 400) {
                errorMessage = "errors.parseError";
            }

            this._toaster.showException("alert.alertSaved", errorMessage);
        } finally {
            this.isAddingSource = false;
        }
    }

    removeEntry(entry: AlertEntry): void {
        this._modalController.openModal(async () => { 
            this.isUpdatingAlert = true; 

            entry.isDeleted = true;

            try {
                var updatedAlert = await this._alertService.update(this._userId, this.alert);
                if (updatedAlert) {
                    // This might rebind everything, but we need it when we remove an Entry. Maybe a dedicated route would help
                    this.alert = updatedAlert;
                    this.searchForSameProducts();
                } else {
                    throw new Error();
                }

                this._toaster.showSuccess("alert.alertSaved");
            } catch(e) {
                this._toaster.showError("alert.alertSaved");
            } finally {
                this.isUpdatingAlert = false;
            }
        });
    }

    private async searchForSameProducts(): Promise<void> {
        this.suggestedProducts = new Array<ProductInfo>();

        // Look for similar products only if there is a product identifier present
        var productIdentifiers = this.alert.entries.map(x => x.productIdentifier).filter(x => !!x).filter((v, i, a) => a.indexOf(v) === i);
        if (productIdentifiers.length) {
            this.isSearchingProducts = true;

            var alertEntriesUrls = this.alert.entries.map(x => x.source);

            try {
                for (var i = 0; i < productIdentifiers.length; i++) {
                    // TODO Make this search asynchronously
                    var searchResults = await this._productService.searchByProductIdentifier(productIdentifiers[i]);
                    for (var j = 0; j < searchResults.length; j++) {
                        if (!alertEntriesUrls.includes(searchResults[j].source)) {
                            this.suggestedProducts.push(searchResults[j]);
                        }
                    }
                }
            } finally {
                this.isSearchingProducts = false;
            }
        }
    }
}