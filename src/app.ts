import { Aurelia } from "aurelia-framework";
import { Router, RouterConfiguration } from "aurelia-router";
import { PLATFORM } from "aurelia-pal";

export class App {
    router: Router;

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = "Aurelia";
        config.map([
            { route: ["", "welcome"], name: "welcome",      moduleId: PLATFORM.moduleName("./welcome"),       nav: true,  title: "Welcome" },
            { route: "login",         name: "login",        moduleId: PLATFORM.moduleName("./account/login"), nav: false, title: "Login" },
            { route: "user-page",     name: "user-page",    moduleId: PLATFORM.moduleName("./user/index"),    nav: true,  title: "Child Router" },
        ]);

        this.router = router;
    }
}
