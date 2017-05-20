import { autoinject } from "aurelia-dependency-injection";
import { bindable } from "aurelia-framework";
import { SourcesService } from "../../services/sources-service";
import { Source } from "../../models/source";

@autoinject()
export class AddSource {
    @bindable class: string;
    @bindable add;
    @bindable cancel;

    private _sourcesService: SourcesService;

    newAlertUrl: string;
    sources: Array<Source>;

    constructor(sourcesService: SourcesService) {
        this._sourcesService = sourcesService;
    }

    bind(): void {
        this.sources = this._sourcesService.sources;
    }

    createSource() {
        this.add({ newAlertUrl: this.newAlertUrl });
        this.newAlertUrl = "";
    }

    cancelSource() {
        this.cancel();
        this.newAlertUrl = "";
    }
}