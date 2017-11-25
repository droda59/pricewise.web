import { autoinject } from "aurelia-dependency-injection";
import { bindable } from "aurelia-framework";
import { SourcesService } from "../../../shared/services/sources-service";
import { Source } from "../../../shared/models/source";
import { Modal } from "../../../shared/modal";

@autoinject()
export class AddSourceModal extends Modal {
    private _sourcesService: SourcesService;

    newAlertUrl: string;
    sources: Array<Source>;

    @bindable className: string;
    @bindable add;

    constructor(sourcesService: SourcesService) {
        super();

        this._sourcesService = sourcesService;
    }

    bind(): void {
        this.sources = this._sourcesService.sources;
    }

    createSource() {
        this.add({ newAlertUrl: this.newAlertUrl });
        this.close();
    }

    protected reset(): void {
        this.newAlertUrl = undefined;
    }
}
