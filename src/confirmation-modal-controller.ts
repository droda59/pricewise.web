export class ConfirmationModalController {
    openModal(onApprove, modalIdentifier?: string): void {
        var modalSelector = ".ui.confirmation.modal";
        if (modalIdentifier) {
            modalSelector += `.${modalIdentifier}`;
        }

        $(modalSelector).modal({
            onApprove: onApprove
        })
        .modal("show");
    }
}
