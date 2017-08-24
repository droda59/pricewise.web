import { Source } from "./source";
import { SourcesService } from "../services/sources-service";

export class AlertEntry implements IAlertEntry {
    uri: string;
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

            this.source = SourcesService.getSource(this.uri);
        }
    }
}

interface IAlertEntry {
    uri: string;
    title: string;
    productIdentifier: string;
    lastPrice: number;
    isDeleted: boolean;
}