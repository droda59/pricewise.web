﻿import "../static/styles.css";
import "../static/config.json";
// import "../semantic/dist/semantic.min.css";
import "../semantic/dist/semantic.min.js";

import { TCustomAttribute } from "aurelia-i18n";
import { Aurelia } from "aurelia-framework";
import { PLATFORM } from "aurelia-pal";
import { AppRouter } from "aurelia-router";
import { EventAggregator } from "aurelia-event-aggregator";
import Backend from "i18next-xhr-backend";
import * as Bluebird from "bluebird";

Bluebird.config({ warnings: { wForgottenReturn: false } });

export async function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .plugin(PLATFORM.moduleName("shared"))
        .plugin(PLATFORM.moduleName("aurelia-chart"))
        .plugin(PLATFORM.moduleName("aurelia-configuration"), config => {
            config.setDirectory("");
            config.setEnvironments({
                development: ["localhost"],
                staging: ["pricewise-web-staging.azurewebsites.net"],
                production: ["pricewi.se"]
            });
        })
        .plugin(PLATFORM.moduleName("aurelia-i18n"), i18n => {
            let aliases = ["t", "i18n"];
            TCustomAttribute.configureAliases(aliases);
            i18n.i18next.use(Backend);
            return i18n.setup({
                backend: {
                    loadPath: "./shared/assets/locales/{{lng}}/{{ns}}.json",
                },
                attributes: aliases,
                lng : "en-CA",
                fallbackLng : "fr-CA",
                debug : false
            }).then(() => {
              const router = aurelia.container.get(AppRouter);
              router.transformTitle = title => i18n.tr(title);

              const eventAggregator = aurelia.container.get(EventAggregator);
              eventAggregator.subscribe('i18n:locale:changed', () => {
                  router.updateTitle();
              });
          })
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

    Array.prototype.removeWhere = function(callback): void {
        var itemsToRemove = this.filter(callback);
        for (var i = 0; i < itemsToRemove.length; i++) {
            this.remove(itemsToRemove[i]);
        }
    }
}

declare global {
	interface Array<T> {
		remove(object: any): void;
		removeWhere(callback): void;
	}
}
