import { autoinject } from "aurelia-dependency-injection";
import { Toaster } from "../../services/toaster";
import { UserService } from "../../services/user-service";
import { User } from "../../models/user";

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
        this._userId = localStorage.getItem("user-id");
    }

    async activate(): Promise<void> {
        this.user = await this._userService.get(this._userId);
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