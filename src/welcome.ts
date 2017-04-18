import { autoinject } from "aurelia-dependency-injection";
import { Router } from "aurelia-router";

@autoinject()
export class Welcome {
    router: Router;

    constructor(router: Router) {
        this.router = router;
    }
}
