﻿import "../static/styles.css";
import "../static/config.json";
// import "../semantic/dist/semantic.min.css";
import "../semantic/dist/semantic.min.js";

import { TCustomAttribute } from "aurelia-i18n";
import { Aurelia } from "aurelia-framework";
import { PLATFORM } from "aurelia-pal";
import Backend from "i18next-xhr-backend";
import * as Bluebird from "bluebird";

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
        .plugin(PLATFORM.moduleName("aurelia-i18n"), (instance) => {
            let aliases = ["t", "i18n"];
            TCustomAttribute.configureAliases(aliases);
            instance.i18next.use(Backend);
            return instance.setup({
                backend: {
                    loadPath: "./locales/{{lng}}/{{ns}}.json",
                },
                attributes: aliases,
                lng : "en-CA",
                fallbackLng : "en-CA",
                debug : false
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
                    filter: element => {
                        return element instanceof HTMLElement 
                            && (element.classList.contains("button") 
                                || element.nodeName.toLowerCase() === "a" 
                                || element.nodeName.toLowerCase() === "button");
                    }
                }
            });
        });

    await aurelia.start();
    await aurelia.setRoot(PLATFORM.moduleName("app"));

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