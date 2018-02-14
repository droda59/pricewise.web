import { autoinject } from "aurelia-dependency-injection";
import { Toaster } from "../../shared/services/toaster";
import { UserService } from "../../shared/services/user-service";
import { User } from "../../shared/models/user";

@autoinject()
export class AccountSettings {
    private _userService: UserService;
    private _toaster: Toaster;
    private _userId: string;

    user: User;
    isUpdatingUser: boolean;

    constructor(userService: UserService, toaster: Toaster) {
        this._userService = userService;
        this._toaster = toaster;
        this._userId = localStorage.getItem("user_id");
    }

    async activate(): Promise<void> {
        this.user = await this._userService.get(this._userId);
    }

    attached(): void {
        $(".ui.dropdown").dropdown();
    }

    async save(): Promise<void> {
        this.isUpdatingUser = true;

        try {
            var updatedUser = await this._userService.update(this.user);
            if (updatedUser) {
                this.user = updatedUser;
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
