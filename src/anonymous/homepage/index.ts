import { autoinject } from "aurelia-dependency-injection";
import { EventAggregator } from "aurelia-event-aggregator";
import { I18N, BaseI18N } from "aurelia-i18n";
import { AureliaConfiguration } from "aurelia-configuration";
import { Source } from "../../shared/models/source";
import { SourcesService } from "../../shared/services/sources-service";

@autoinject()
export class Welcome extends BaseI18N {
    private _sourcesService: SourcesService;

    sources: Array<Source>;
    chromeAppUrl: string;

    constructor(
            sourcesService: SourcesService,
            configure: AureliaConfiguration,
            i18n: I18N,
            element: Element,
            ea: EventAggregator) {
        super(i18n, element, ea);

        this._sourcesService = sourcesService;
        this.chromeAppUrl = configure.get("chrome");
    }

    activate(): void {
        this.sources = this._sourcesService.sources;
    }
}
