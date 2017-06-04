import { autoinject } from "aurelia-dependency-injection";
import * as Toastr from "toastr";
import { UserService } from "../../services/user-service";
import { User } from "../../models/user";

@autoinject()
export class AccountSettings {
    private _userService: UserService;
    private _userId: string;

    user: User;
    isUpdatingUser: boolean;

    constructor(userService: UserService) {
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

            Toastr.success("User information saved successfully!", "Success", { timeOut: 3000 });
        } catch(e) {
            Toastr.error("An error ocurred during the save.", "Error", { timeOut: 3000 });
        } finally {
            this.isUpdatingUser = false;
        }
    }
}