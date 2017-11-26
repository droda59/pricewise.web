import { autoinject } from "aurelia-dependency-injection";
import { containerless } from "aurelia-framework";
import { bindable } from "aurelia-framework";
import { Modal } from "../modal";

@autoinject()
@containerless
export class ConfirmationModal extends Modal {
    @bindable message: string;

    constructor() {
        super();
    }
}
