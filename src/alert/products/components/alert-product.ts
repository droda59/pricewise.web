import { autoinject } from "aurelia-dependency-injection";
import { bindable, bindingMode } from "aurelia-framework";
import { AlertEntry } from "../../../shared/models/alert-entry";

@autoinject()
export class AlertProduct {
    @bindable entry: AlertEntry;
    @bindable note: string;
    @bindable({ defaultBindingMode: bindingMode.oneTime }) isReadOnly: boolean;
    @bindable save;
    @bindable removeEntry;

    private _loaded: boolean;

    bind(): void {
        this._loaded = false;
        this.note = this.entry.note;
    }

    attached() {
        this._loaded = true;
    }

    detached() {
        this._loaded = false;
    }

    noteChanged(newValue: string, oldValue: string) {
        if (!this.isReadOnly && this._loaded && newValue != oldValue) {
            this.entry.note = newValue;
            this.save();
        }
    }

    remove(entry: AlertEntry) {
        if (!this.isReadOnly) {
            this.removeEntry({ entry: this.entry });
        }
    }
}
