import { autoinject } from "aurelia-dependency-injection";
import { EventAggregator } from "aurelia-event-aggregator";
import { BaseI18N, I18N } from "aurelia-i18n";

@autoinject()
export class Footer extends BaseI18N {
    constructor(i18n: I18N, element: Element, ea: EventAggregator) {
        super(i18n, element, ea);
    }
}
