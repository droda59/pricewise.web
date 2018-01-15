import { autoinject } from "aurelia-dependency-injection";
import { bindable, bindingMode } from "aurelia-framework";
import { List } from "../../shared/models/list";

@autoinject()
export class ListMenu {
    @bindable({ defaultBindingMode: bindingMode.oneTime }) selectAllEnabled: boolean = false;
    @bindable selectedList: List;
    @bindable lists: Array<List>;
    @bindable delete;
    @bindable share;

    selectList(list?: List): void {
        if (!list && this.selectedList != null) {
            this.selectedList = null;
        } else if (this.selectedList != list) {
            this.selectedList = list;
        }
    }

    shareList(list: List): void {
        this.share({ list: list });
    }

    deleteList(list: List) {
        this.delete({ list: list });
    }
}
