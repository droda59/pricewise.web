export class ConfirmationModalController {
    openModal(onApprove): void {
        $(".ui.modal").modal({
            onApprove: onApprove
        })
        .modal("show");
    }
}