import { autoinject } from "aurelia-dependency-injection";
import { EventAggregator } from "aurelia-event-aggregator";
import { BaseI18N, I18N } from "aurelia-i18n";
import { Toaster } from "../../services/toaster";
import { UserService } from "../../services/user-service";
import { UserSettings } from "../../models/user-settings";

@autoinject()
export class AlertSettings extends BaseI18N {
    private _userService: UserService;
    private _toaster: Toaster;
    private _userId: string;

    settings: UserSettings;
    changePercentage: number;
    isUpdatingUser: boolean;

    constructor(userService: UserService, toaster: Toaster, i18n: I18N, element: Element, ea: EventAggregator) {
        super(i18n, element, ea);

        this._userService = userService;
        this._toaster = toaster;
        this._userId = localStorage.getItem("user-id");
    }

    async activate(): Promise<void> {
        var user = await this._userService.get(this._userId);
        this.settings = user.settings;
        this.changePercentage = user.settings.changePercentage * 100;
    }

    attached(): void {
        $(".ui.checkbox").checkbox();
    }

    async save(): Promise<void> {
        this.isUpdatingUser = true;
        
        try {
            this.settings.changePercentage = this.changePercentage / 100;
            var updatedSettings = await this._userService.saveSettings(this._userId, this.settings);
            if (updatedSettings) {
                this.settings = updatedSettings;
                this.changePercentage = updatedSettings.changePercentage * 100;
            } else {
                throw new Error();
            }

            this._toaster.showSuccess("settings.account.settingsSaved");
        } catch(e) {
            this._toaster.showError("settings.account.settingsSaved");
        } finally {
            this.isUpdatingUser = false;
        }
    }
}