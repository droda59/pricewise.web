import { Aurelia } from "aurelia-framework";
import { Router, RouterConfiguration } from "aurelia-router";
import { PLATFORM } from "aurelia-pal";
import { AuthorizeStep } from "./authorize-step";

export class App {
    router: Router;

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = "Aurelia";
        config.addPipelineStep("authorize", AuthorizeStep);

        config.map([
            { route: ["", "welcome"], name: "welcome",      moduleId: PLATFORM.moduleName("./welcome"),       nav: true,  title: "Welcome" },
            { route: "user-page",     name: "user-page",    moduleId: PLATFORM.moduleName("./user/index"),    nav: true,  title: "Child Router", authRoute: true },
        ]);
        
        this.router = router;
    }
}
