import { autoinject } from "aurelia-dependency-injection";
import { Router } from "aurelia-router";
import * as toastr from "toastr";
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
        this._userId = "58ee6d988f0e11f301e93bc3";
    }

    async activate(): Promise<void> {
        this.user = await this._userService.get(this._userId);
    }

    async save(): Promise<void> {
        var updateSuccessful = await this._userService.update(this.user);
        if (updateSuccessful) {
            toastr.success("User information saved successfully!", "Success", { timeOut: 3000 });
        } else {
            toastr.error("An error ocurred during the save.", "Error", { timeOut: 3000 });
        }
    }

    cancel(): void {
        this._router.navigateToRoute("profile");
    }
}