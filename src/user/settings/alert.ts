import { autoinject } from "aurelia-dependency-injection";
import * as Toastr from "toastr";
import { UserService } from "../../services/user-service";
import { UserSettings } from "../../models/user-settings";

@autoinject()
export class AlertSettings {
    private _userService: UserService;
    private _userId: string;

    settings: UserSettings;
    changePercentage: number;

    constructor(userService: UserService) {
        this._userService = userService;
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
        this.settings.changePercentage = this.changePercentage / 100;
        var updatedSettings = await this._userService.saveSettings(this._userId, this.settings);
        if (updatedSettings) {
            Toastr.success("User settings saved successfully!", "Success", { timeOut: 3000 });

            this.settings = updatedSettings;
            this.changePercentage = updatedSettings.changePercentage * 100;
        } else {
            Toastr.error("An error ocurred during the save.", "Error", { timeOut: 3000 });
        }
    }
}