import { autoinject } from "aurelia-dependency-injection";
import { I18N } from "aurelia-i18n";
import * as Toastr from "toastr";

@autoinject()
export class Toaster {
    private _i18n : I18N;

    constructor(i18n: I18N) {
        this._i18n = i18n;
    }

    showSuccess(message: string) {
        Toastr.success(
            this._i18n.tr(message, { context: "success" }), 
            this._i18n.tr("success"), 
            { timeOut: 3000 });
    }
    
    showError(message: string) {
        Toastr.error(
            this._i18n.tr(message, { context: "failure" }), 
            this._i18n.tr("error"), 
            { timeOut: 3000 });
    }

    showException(message: string, exception: string) {
        if (!!exception) {
            exception = this._i18n.tr(exception);
        }

        Toastr.error(
            this._i18n.tr(message, { context: "exception", error: exception }), 
            this._i18n.tr("error"), 
            { timeOut: 3000 });
    }
}