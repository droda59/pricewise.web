import { bindable, containerless } from "aurelia-framework";
import { ListSummary } from "../../shared/models/list-summary";

@containerless
export class ListLabel {
    @bindable className: string;
    @bindable label: string;
    @bindable list: ListSummary;
    @bindable click;
    @bindable delete;

    bind() {
        // if (!this.label && this.list) {
        //     this.label = this.list.name;
        // }
    }
}
