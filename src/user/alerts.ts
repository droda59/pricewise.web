import { autoinject } from "aurelia-dependency-injection";
import { bindable } from "aurelia-framework";
import * as toastr from "toastr";
import { AlertService } from "../services/alert-service";
import { UserService } from "../services/user-service";
import { UserAlert } from "../models/user-alert";
import { User } from "../models/user";

@autoinject()
export class Alerts {
    private _alertService: AlertService;
    private _userService: UserService;
    private _userId: string;
    private _originalAlerts: Array<UserAlert> = new Array<UserAlert>();

    @bindable searchString: string;

    isAdding: boolean;
    isUpdatingAlert: boolean;
    isCreatingAlert: boolean;
    newAlertUrl: string;
    alerts: Array<UserAlert> = new Array<UserAlert>();

    constructor(userService: UserService, alertService: AlertService) {
        this._alertService = alertService;
        this._userService = userService;
        this._userId = "58ee6d988f0e11f301e93bc3";
    }

    async activate(): Promise<void> {
        const user = await this._userService.get(this._userId);

        this._originalAlerts = user.alerts;
        this.alerts = user.alerts;
    }

    async create(): Promise<void> {
        this.isCreatingAlert = true;

        const newAlert = await this._alertService.create(this._userId, this.newAlertUrl);
        this._originalAlerts.push(newAlert);

        if (this.searchString && newAlert.title.toUpperCase().indexOf(this.searchString.toUpperCase()) > -1) {
            this.alerts.push(newAlert);
        }

        this.newAlertUrl = "";
        this.isCreatingAlert = false;
        this.isAdding = false;
    }

    async activateAlert(alert: UserAlert): Promise<void> {
        this.isUpdatingAlert = true;

        if (alert.isActive) {
            alert.isActive = false;
        } else {
            alert.isActive = true;
        }
        alert = await this._alertService.update(this._userId, alert);

        this.isUpdatingAlert = false;
    }

    async removeAlert(alert: UserAlert): Promise<void> {
        this.isUpdatingAlert = true;

        const alertDeleted = await this._alertService.delete(this._userId, alert.id);
        if (alertDeleted) {
            this._originalAlerts.remove(alert);

            if (this.alerts.indexOf(alert) > -1) {
                this.alerts.remove(alert);
            }
        }

        this.isUpdatingAlert = false;
    }

    addAlert(): void {
        this.isAdding = true;
    }

    cancel(): void {
        this.isAdding = false;
    }

    clearSearch(): void {
        this.searchString = "";
    }

    private searchStringChanged(newValue: string, oldValue: string): void {
        const uppercaseNewValue = newValue.toUpperCase();

        this.alerts = this._originalAlerts.filter(x => x.title.toUpperCase().indexOf(uppercaseNewValue) > -1);
    }
}