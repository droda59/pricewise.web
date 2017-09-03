import { Source } from "../../../shared/models/source";
import { SourcesService } from "../../../shared/services/sources-service";

export class AlertEntry implements IAlertEntry {
    originalUrl: string;
    productUrl: string;
    title: string;
    productIdentifier: string;
    lastPrice: number;
    isDeleted: boolean;
    source: Source;

    constructor();
    constructor(dto: IAlertEntry);
    constructor(dto?: IAlertEntry) {
        if (dto) {
            (<any>Object).assign(this, dto);

            this.source = SourcesService.getSource(this.originalUrl);
        }
    }
}

interface IAlertEntry {
    originalUrl: string;
    productUrl: string;
    title: string;
    productIdentifier: string;
    lastPrice: number;
    isDeleted: boolean;
}