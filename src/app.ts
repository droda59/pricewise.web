import { Aurelia } from "aurelia-framework";
import { Router, RouterConfiguration } from "aurelia-router";
import { PLATFORM } from "aurelia-pal";

export class App {

    router: Router;

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = "Aurelia";
        config.map([
            { route: ["", "welcome"], name: "welcome",      moduleId: PLATFORM.moduleName("./welcome"),       nav: true,  title: "Welcome" },
            { route: "user-page",     name: "user-page",    moduleId: PLATFORM.moduleName("./user/index"),    nav: true,  title: "Child Router", authRoute: true },
        ]);
        
        // config.addPipelineStep("authorize", AuthorizeStep);

        this.router = router;
    }
}
