import { RedirectToRoute, PipelineStep } from "aurelia-router";
import * as JwtDecode from "jwt-decode";

export class AuthorizeStep implements PipelineStep {
    run(navigationInstruction, next) {
        if (navigationInstruction.getAllInstructions().some(i => i.config.authRoute)) {
            if (this.tokenIsExpired()) {
                localStorage.removeItem("user-id");
                localStorage.removeItem("access-token");
                
                return next.cancel(new RedirectToRoute("welcome"));
            }
        }

        return next();
    }

    private tokenIsExpired(): boolean {
        let jwt = localStorage.getItem("access-token");
        if (jwt) {
            let jwtExp = JwtDecode(jwt).exp;
            let expiryDate = new Date(0);
            expiryDate.setUTCSeconds(jwtExp);
            
            if(new Date() < expiryDate) {
                return false;
            }
        }

        return true;
    }
}