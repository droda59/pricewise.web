import { autoinject } from "aurelia-dependency-injection";
import { bindable } from "aurelia-framework";
import { SourcesService } from "../../../../shared/services/sources-service";
import { Source } from "../../../../shared/models/source";

@autoinject()
export class AddSource {
    @bindable className: string;
    @bindable add;
    @bindable close;

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
        this.close();
    }
}