import { bindable } from "aurelia-framework";
import { Modal } from "../../../shared/modal";

export class SharedListUrlModal extends Modal {
    copied: boolean = false;
    urlField: HTMLInputElement;

    @bindable url: string;

    copyToClipboard(): void {
        this.urlField.select();
        document.execCommand("Copy");
        this.copied = true;

        setInterval(() => { this.copied = false; }, 2000);
    }
}
