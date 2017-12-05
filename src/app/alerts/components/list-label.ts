import { bindable, containerless } from "aurelia-framework";
import { List } from "../../shared/models/list";

@containerless
export class ListLabel {
    @bindable className: string;
    @bindable label: string;
    @bindable list: List;
    @bindable click;
    @bindable delete;
    @bindable share;
}
