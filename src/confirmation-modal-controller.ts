export class ConfirmationModalController {
    openModal(onApprove): void {
        $(".ui.confirmation.modal").modal({
            onApprove: onApprove
        })
        .modal("show");
    }
}