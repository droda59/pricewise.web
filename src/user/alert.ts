import { autoinject } from "aurelia-dependency-injection";
import { Router } from "aurelia-router";
import * as toastr from "toastr";
import { AlertService } from "../services/alert-service";
import { AlertEntry } from "../models/alert-entry";
import { UserAlert } from "../models/user-alert";
import { User } from "../models/user";

@autoinject()
export class Alert {
    private _router: Router;
    private _alertService: AlertService;
    private _userId: string;
    private _alertId: string;

    alert: UserAlert;
    newEntryUrl: string;

    constructor(alertService: AlertService, router: Router) {
        this._router = router;
        this._alertService = alertService;
        this._userId = localStorage.getItem("user-id");
    }

    async activate(route, routeConfig): Promise<void> {
        if (route.alertId) {
            this._alertId = route.alertId;

            this.alert = await this._alertService.get(this._userId, this._alertId);

            routeConfig.navModel.title = this.alert.title;
        }
    }

    attached(): void {
        $('.ui.checkbox').checkbox();
    }

    async save(): Promise<void> {
        var updateSuccessful = await this._alertService.update(this._userId, this.alert);
        if (updateSuccessful) {
            toastr.success("Alert saved successfully!", "Success", { timeOut: 3000 });
        } else {
            toastr.error("An error ocurred during the save.", "Error", { timeOut: 3000 });
        }

        this._router.navigateToRoute("alerts");
    }

    async addEntry(): Promise<void> {
        var newEntry = new AlertEntry();
        newEntry.uri = this.newEntryUrl;

        this.alert.entries.push(newEntry);
        this.newEntryUrl = "";

        this.alert = await this._alertService.update(this._userId, this.alert);
    }

    removeEntry(entry: AlertEntry): void {
        entry.isDeleted = true;
    }

    cancel(): void {
        this._router.navigateToRoute("alerts");
    }
}