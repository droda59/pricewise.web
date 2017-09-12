import { autoinject } from "aurelia-dependency-injection";
import { EventAggregator } from "aurelia-event-aggregator";
import { BaseI18N, I18N } from "aurelia-i18n";
import { User } from "../../shared/models/user";
import { Toaster } from "../../shared/services/toaster";
import { UserService } from "../../shared/services/user-service";

@autoinject()
export class AlertSettings extends BaseI18N {
    private _userService: UserService;
    private _toaster: Toaster;
    private _userId: string;

    user: User;
    changePercentage: number;
    isUpdatingUser: boolean;

    constructor(userService: UserService, toaster: Toaster, i18n: I18N, element: Element, ea: EventAggregator) {
        super(i18n, element, ea);

        this._userService = userService;
        this._toaster = toaster;
        this._userId = localStorage.getItem("user-id");
    }

    async activate(): Promise<void> {
        this.user = await this._userService.get(this._userId);
        this.changePercentage = this.user.settings.changePercentage * 100;
    }

    attached(): void {
        $(".ui.checkbox").checkbox();
    }

    async save(): Promise<void> {
        this.isUpdatingUser = true;

        try {
            this.user.settings.changePercentage = this.changePercentage / 100;

            var updatedUser = await this._userService.update(this.user);
            if (updatedUser) {
                this.user = updatedUser;
                this.changePercentage = updatedUser.settings.changePercentage * 100;
            } else {
                throw new Error();
            }

            this._toaster.showSuccess("settings.alerts.settingsSaved");
        } catch(e) {
            this._toaster.showError("settings.alerts.settingsSaved");
        } finally {
            this.isUpdatingUser = false;
        }
    }
}
