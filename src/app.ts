import { Aurelia } from "aurelia-framework";
import { Router, RouterConfiguration } from "aurelia-router";
import { PLATFORM } from "aurelia-pal";
import { AuthorizeStep } from "./authorize-step";

export class App {
    router: Router;

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = "Price Alerts";
        config.addPipelineStep("authorize", AuthorizeStep);

        config.map([
            { route: ["", "welcome"], name: "welcome", moduleId: PLATFORM.moduleName("./welcome"),    nav: true,  title: "Home" },
            { route: "user",          name: "user",    moduleId: PLATFORM.moduleName("./user/index"), nav: true,  title: "Alerts"/*, authRoute: true*/ },
        ]);
        
        this.router = router;
    }
}
