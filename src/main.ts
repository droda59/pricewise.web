import "../static/styles.css";
import "../static/config.json";
// import "../semantic/dist/semantic.min.css";
import "../semantic/dist/semantic.min.js";
import "../node_modules/toastr/build/toastr.min.css";

import { Aurelia } from "aurelia-framework";
import { PLATFORM } from "aurelia-pal";
import * as Bluebird from "bluebird";
import * as Toastr from "toastr";
import * as moment from "moment";

Bluebird.config({ warnings: { wForgottenReturn: false } });

export async function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin(PLATFORM.moduleName("resources"))
        .plugin(PLATFORM.moduleName("aurelia-chart"))
        .plugin(PLATFORM.moduleName("aurelia-configuration"), config => {
            config.setDirectory("");
            config.setEnvironments({
                development: ["localhost"],
                production: ["pricewise.azurewebsites.net", "pricewi.se"]
            });
        })
        .plugin(PLATFORM.moduleName("aurelia-google-analytics"), config => {
            config.init("UA-100559856-1");
            config.attach({
                logging: {
                    enabled: false
                },
                pageTracking: {
                    enabled: true
                },
                clickTracking: {
                    enabled: true,
                    filter: config._options.clickTracking.filter
                }
            });
        });

    await aurelia.start();
    await aurelia.setRoot(PLATFORM.moduleName("app"));

	moment.relativeTimeThreshold("s", 60);
	moment.relativeTimeThreshold("m", 60);
	moment.relativeTimeThreshold("h", 24);
	moment.relativeTimeThreshold("d", 28);
	moment.relativeTimeThreshold("M", 12);

    Array.prototype.remove = function(object: any): void {
        var index = this.indexOf(object);
        if (index > -1) {
            this.splice(index, 1);
        }
    }
}

declare global {
	interface Array<T> {
		remove(object: any): void;
	}
}