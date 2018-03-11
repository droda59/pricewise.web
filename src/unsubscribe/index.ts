import { autoinject } from "aurelia-dependency-injection";
import { EmailNotificationService } from "../shared/services/email-notification-service";

@autoinject()
export class Unsubscribe {
    private _emailNotificationService: EmailNotificationService;

    constructor(emailNotificationService: EmailNotificationService) {
        this._emailNotificationService = emailNotificationService;
    }

    activate(route, routeConfig) {
        if (route.email && route.alertId) {
            this._emailNotificationService.deactivate(route.email, route.alertId);
        }
    }
}
