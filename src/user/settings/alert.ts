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
    isUpdatingUser: boolean;

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

            Toastr.success("User settings saved successfully!", "Success", { timeOut: 3000 });
        } catch(e) {
            Toastr.error("An error occurred during the save.", "Error", { timeOut: 3000 });
        } finally {
            this.isUpdatingUser = false;
        }
    }
}