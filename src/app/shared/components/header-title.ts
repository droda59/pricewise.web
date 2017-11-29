import { bindable, containerless } from "aurelia-framework";

@containerless
export class HeaderTitle {
    @bindable text: string;
}
