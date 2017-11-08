import { autoinject } from "aurelia-dependency-injection";
import { bindable } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import { BaseI18N, I18N } from "aurelia-i18n";
import { AlertEntry } from "../../../../shared/models/alert-entry";

@autoinject()
export class SourceEntry extends BaseI18N {
    @bindable entry: AlertEntry;
    @bindable note: string;
    @bindable save;
    @bindable removeEntry;

    private _loaded: boolean;

    constructor(i18n: I18N, element: Element, ea: EventAggregator) {
        super(i18n, element, ea);
    }

    bind(): void {
        this._loaded = false;
        this.note = this.entry.note;
    }

    attached() {
        this._loaded = true;
    }

    noteChanged(newValue: string, oldValue: string) {
        if (this._loaded && newValue != oldValue) {
            this.entry.note = newValue;
            this.save();
        }
    }

    remove(entry: AlertEntry) {
        this.removeEntry({ entry: this.entry });
    }
}
