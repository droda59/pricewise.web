import { Source } from "../../../shared/models/source";
import { SourcesService } from "../../../shared/services/sources-service";

export class ProductHistory implements IProductHistory {
    title: string;
    url: string;
    hostName: string;
    priceHistory: Array<PriceChange>;
    source: Source;

    constructor(dto: IProductHistory) {
        (<any>Object).assign(this, dto);

        this.hostName = new URL(dto.url).hostname;
        this.priceHistory = dto.priceHistory ? dto.priceHistory.map(changeDto => new PriceChange(changeDto)) : new Array<PriceChange>();
        this.source = SourcesService.getSource(this.url);
    }
}

interface IProductHistory {
    title: string;
    url: string;
    priceHistory: Array<PriceChange>;
}

class PriceChange implements IPriceChange {
    price: number;
    modifiedAt: Date;

    constructor(dto: IPriceChange) {
        (<any>Object).assign(this, dto);

        this.modifiedAt = new Date(dto.modifiedAt);
    }
}

interface IPriceChange {
    price: number;
    modifiedAt: Date;
}