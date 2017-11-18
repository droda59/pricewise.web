import { Source } from "../../../shared/models/source";
import { SourcesService } from "../../../shared/services/sources-service";

export class AlertEntry implements IAlertEntry {
    originalUrl: string;
    productUrl: string;
    productIdentifier: string;
    note: string;
    createdAt: Date;
    originalPrice: number;
    lastPrice: number;
    percentageChange: number;
    absolutePercentageChange: number;
    isDeleted: boolean;
    source: Source;

    constructor();
    constructor(dto: IAlertEntry);
    constructor(dto?: IAlertEntry) {
        if (dto) {
            (<any>Object).assign(this, dto);

            this.createdAt = new Date(dto.createdAt);
            this.note = !!dto.note ? dto.note : "";
            this.source = SourcesService.getSource(this.originalUrl);
            this.percentageChange = (this.lastPrice - this.originalPrice) / this.originalPrice;
            this.absolutePercentageChange = Math.abs(this.percentageChange);
        }
    }
}

interface IAlertEntry {
    originalUrl: string;
    productUrl: string;
    productIdentifier: string;
    note: string;
    createdAt: Date;
    originalPrice: number;
    lastPrice: number;
    isDeleted: boolean;
}
