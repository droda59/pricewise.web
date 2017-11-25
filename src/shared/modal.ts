import { Guid } from "./models/guid";

export class Modal {
    id: Guid;

    constructor() {
        this.id = new Guid();
    }

    protected close() {
        this.reset();
        $(`.ui.dimmer .overlay.modal.${this.id}`).modal("hide");
    }

    protected reset(): void {}
}
