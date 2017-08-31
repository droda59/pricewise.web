import { autoinject } from "aurelia-dependency-injection";
import { I18N } from "aurelia-i18n";
import * as Toastr from "toastr";
import { ConfirmationModalController } from "../../confirmation-modal-controller";
import { AlertService } from "../../services/alert-service";
import { ProductService } from "../../services/product-service";
import { AlertEntry } from "../../models/alert-entry";
import { UserAlert } from "../../models/user-alert";
import { ProductInfo } from "../../models/product-info";

@autoinject()
export class Sources {
    private _alertService: AlertService;
    private _productService: ProductService;
    private _modalController: ConfirmationModalController;
    private _i18n: I18N;
    private _userId: string;
    private _alertId: string;

    alert: UserAlert;
    isSearchingProducts: boolean;
    isUpdatingAlert: boolean;
    isAddingSource: boolean;
    suggestedProducts: Array<ProductInfo> = new Array<ProductInfo>();

    constructor(alertService: AlertService, productService: ProductService, modalController: ConfirmationModalController, i18n: I18N) {
        this._alertService = alertService;
        this._productService = productService;
        this._modalController = modalController;
        this._i18n = i18n;
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

            Toastr.success(
                this._i18n.tr("alert.alertSaved", { context: "success" }), 
                this._i18n.tr("success"), 
                { timeOut: 3000 });
        } catch(e) {
            var errorMessage = "";
            if (e.status === 404) {
                errorMessage = this._i18n.tr("errors.sourceNotSupported");
            } else if (e.status === 400) {
                errorMessage = this._i18n.tr("errors.parseError");
            }

            Toastr.error(
                this._i18n.tr("alert.alertSaved", { context: "exception", error: errorMessage }), 
                this._i18n.tr("error"), 
                { timeOut: 3000 });
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

                Toastr.success(
                    this._i18n.tr("alert.alertSaved", { context: "success" }), 
                    this._i18n.tr("success"), 
                    { timeOut: 3000 });
            } catch(e) {
                Toastr.error(
                    this._i18n.tr("alert.alertSaved", { context: "failure" }), 
                    this._i18n.tr("error"), 
                    { timeOut: 3000 });
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