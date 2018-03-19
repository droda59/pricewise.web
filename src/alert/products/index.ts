import { autoinject } from "aurelia-dependency-injection";
import { Router } from "aurelia-router";
import { AlertService } from "../../shared/services/alert-service";
import { SharedListService } from "../../shared-list/services/shared-list-service";
import { ProductService } from "../../shared/services/product-service";
import { Toaster } from "../../shared/services/toaster";
import { AlertEntry } from "../../shared/models/alert-entry";
import { UserAlert } from "../../shared/models/user-alert";
import { ProductInfo } from "../../shared/models/product-info";
import { AddProductModal } from "../../shared/components/add-product-modal";
import { ConfirmationModal } from "../../shared/components/confirmation-modal";
import { ConfirmationModalController } from "../../confirmation-modal-controller";

@autoinject()
export class Products {
    private _router: Router;
    private _alertService: AlertService;
    private _sharedListService: SharedListService;
    private _productService: ProductService;
    private _modalController: ConfirmationModalController;
    private _toaster: Toaster;
    private _userId: string;
    private _alertId: string;

    confirmationModal: ConfirmationModal;
    addProductModal: AddProductModal;
    alert: UserAlert;
    isSearchingProducts: boolean;
    isUpdatingAlert: boolean;
    isAddingProduct: boolean;
    isReadOnly: boolean = false;
    suggestedProducts: Array<ProductInfo> = new Array<ProductInfo>();

    constructor(
            router: Router,
            alertService: AlertService,
            sharedListService: SharedListService,
            productService: ProductService,
            modalController: ConfirmationModalController,
            toaster: Toaster) {
        this._router = router;
        this._alertService = alertService;
        this._sharedListService = sharedListService;
        this._productService = productService;
        this._modalController = modalController;
        this._toaster = toaster;
    }

    async activate(route): Promise<void> {
        if (route.alertId) {
            this._alertId = route.alertId;

            var alert;
            if (route.listId) {
                this.isReadOnly = true;
                alert = await this._sharedListService.getAlertDetails(route.listId, this._alertId);
            } else {
                this._userId = localStorage.getItem("user_id");
                alert = await this._alertService.get(this._userId, this._alertId);
            }

            this.alert = alert;
            this.searchForSameProducts();
        }
    }

    detached() {
        $(".ui.modals.page.dimmer").remove();
    }

    addProduct(): void {
        this._modalController.openOverlayModal(this.addProductModal);
    }

    async save(): Promise<void> {
        if (!this.isReadOnly) {
            this.isUpdatingAlert = true;

            try {
                var updatedAlert = await this._alertService.update(this._userId, this.alert);
                if (!updatedAlert) {
                    throw new Error();
                }

                this._toaster.showSuccess("alert.alertSaved");
            } catch(e) {
                this._toaster.showError("alert.alertSaved");
            } finally {
                this.isUpdatingAlert = false;
            }
        }
    }

    async addEntry(newEntryUrl: string): Promise<void> {
        if (!this.isReadOnly) {
            this.isAddingProduct = true;

            try {
                var updatedAlert = await this._alertService.createEntry(this._userId, this._alertId, newEntryUrl);
                if (updatedAlert) {
                    this.alert = updatedAlert;
                    this.searchForSameProducts();
                } else {
                    throw new Error();
                }

                this._toaster.showSuccess("alert.alertSaved");
            } catch(e) {
                var errorMessage = "";
                if (e.status === 404) {
                    errorMessage = "errors.storeNotSupported";
                } else if (e.status === 400) {
                    errorMessage = "errors.parseError";
                } else if (e.status === 501) {
                    errorMessage = "errors.correctPriceError";
                }

                this._toaster.showException("alert.alertSaved", errorMessage);
            } finally {
                this.isAddingProduct = false;
            }
        }
    }

    removeEntry(entry: AlertEntry): void {
        if (!this.isReadOnly) {
            this._modalController.confirm(this.confirmationModal, async () => {
                this.isUpdatingAlert = true;

                entry.isDeleted = true;

                if (!this.alert.entries.filter(x => !x.isDeleted).length) {
                    try {
                        const alertDeleted = await this._alertService.delete(this._userId, this.alert.id);
                        if (alertDeleted) {
                            this._router.navigateToRoute("alerts");
                        } else {
                            throw new Error();
                        }

                        this._toaster.showSuccess("alerts.alertDeleted");
                    } catch(e) {
                        this._toaster.showError("alerts.alertDeleted");
                    } finally {
                        this.isUpdatingAlert = false;
                    }
                } else {
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
                }
            });
        }
    }

    private async searchForSameProducts(): Promise<void> {
        if (!this.isReadOnly) {
            this.suggestedProducts = new Array<ProductInfo>();

            // Look for similar products only if there is a product identifier present
            var productIdentifiers = this.alert.entries.map(x => x.productIdentifier).filter(x => !!x).filter((v, i, a) => a.indexOf(v) === i);
            if (productIdentifiers.length) {
                this.isSearchingProducts = true;

                var alertEntriesUrls = this.alert.entries.map(x => x.store);

                try {
                    var searchResults = [];//await this._productService.searchByProductIdentifier(productIdentifiers);
                    for (var j = 0; j < searchResults.length; j++) {
                        if (!alertEntriesUrls.includes(searchResults[j].store)) {
                            this.suggestedProducts.push(searchResults[j]);
                        }
                    }
                } finally {
                    this.isSearchingProducts = false;
                }
            }
        }
    }
}
