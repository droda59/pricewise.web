import { RedirectToRoute, PipelineStep } from "aurelia-router";
import * as JwtDecode from "jwt-decode";

export class AuthorizeStep implements PipelineStep {
    run(navigationInstruction, next) {
        if (navigationInstruction.getAllInstructions().some(i => i.config.authRoute)) {
            if (!this.isAuthenticated()) {
                localStorage.removeItem("user_id");
                localStorage.removeItem("access_token");

                return next.cancel(new RedirectToRoute("welcome"));
            }
        }

        return next();
    }

    private isAuthenticated(): boolean {
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }
}
