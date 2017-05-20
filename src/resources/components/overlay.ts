import { bindable } from "aurelia-framework";

export class Overlay {
    @bindable close;

    closeOverlay() {
        this.close();
    }
}