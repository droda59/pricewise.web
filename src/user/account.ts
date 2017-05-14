import { autoinject } from "aurelia-dependency-injection";
import { Router } from "aurelia-router";
import * as Toastr from "toastr";
import { UserService } from "../services/user-service";
import { User } from "../models/user";

@autoinject()
export class Account {
    private _router: Router;
    private _userService: UserService;
    private _userId: string;

    user: User;

    constructor(userService: UserService, router: Router) {
        this._router = router;
        this._userService = userService;
        this._userId = localStorage.getItem("user-id");
    }

    async activate(): Promise<void> {
        this.user = await this._userService.get(this._userId);
    }

    async save(): Promise<void> {
        var updatedUser = await this._userService.update(this.user);
        if (updatedUser) {
            Toastr.success("User information saved successfully!", "Success", { timeOut: 3000 });

            this.user = updatedUser;
        } else {
            Toastr.error("An error ocurred during the save.", "Error", { timeOut: 3000 });
        }
    }

    cancel(): void {
        this._router.navigateToRoute("account");
    }
}