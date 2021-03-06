import { Modal } from "./shared/modal";

export class ConfirmationModalController {
    confirm(modal: Modal, onApprove): void {
        $(`.ui.confirmation.modal.${modal.id}`).modal({
            onApprove: onApprove
        })
        .modal("show");

        modal.open();
    }

    openOverlayModal(modal: Modal): void {
        $(`.ui.dimmer .overlay.modal.${modal.id}`).modal("show");

        modal.open();
    }
}
