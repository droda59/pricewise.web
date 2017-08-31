import { autoinject } from "aurelia-dependency-injection";
import { I18N } from "aurelia-i18n";
import * as Toastr from "toastr";
import { UserService } from "../../services/user-service";
import { User } from "../../models/user";

@autoinject()
export class AccountSettings {
    private _userService: UserService;
    private _i18n: I18N;
    private _userId: string;

    user: User;
    isUpdatingUser: boolean;

    constructor(userService: UserService, i18n: I18N) {
        this._i18n = i18n;
        this._userService = userService;
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

            Toastr.success(
                this._i18n.tr("settings.account.settingsSaved", { context: "success" }), 
                this._i18n.tr("success"), 
                { timeOut: 3000 });
        } catch(e) {
            Toastr.error(
                this._i18n.tr("settings.account.settingsSaved", { context: "failure" }), 
                this._i18n.tr("error"), 
                { timeOut: 3000 });
        } finally {
            this.isUpdatingUser = false;
        }
    }
}