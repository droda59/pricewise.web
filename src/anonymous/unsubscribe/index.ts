import { autoinject } from "aurelia-dependency-injection";
import { AnonymousService } from "../shared/services/anonymous-service";

@autoinject()
export class Unsubscribe {

    private _anonymousService: AnonymousService;

    constructor(anonymousService: AnonymousService) {
        this._anonymousService = anonymousService;
    }

    async activate(route, routeConfig): Promise<void> {
        if (route.email && route.alertId) {
            this._anonymousService.desactivate(route.email, route.alertId);
        }
    }
}
