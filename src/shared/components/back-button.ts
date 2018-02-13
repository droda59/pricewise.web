import { containerless } from "aurelia-framework";
import { autoinject } from "aurelia-dependency-injection";
import { Router, RouterConfiguration } from "aurelia-router";

@containerless
@autoinject
export class BackButton {
    private _router: Router;

    constructor(router: Router) {
        this._router = router;
    }

    navigateBack(): void {
        this._router.navigateBack();
    }
}
