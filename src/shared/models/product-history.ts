import { Store } from "../models/store";
import { StoreService } from "../services/store-service";

export class ProductHistory implements IProductHistory {
    title: string;
    url: string;
    priceHistory: Array<PriceChange>;
    store: Store;

    constructor(dto: IProductHistory) {
        (<any>Object).assign(this, dto);

        this.priceHistory = dto.priceHistory ? dto.priceHistory.map(changeDto => new PriceChange(changeDto)) : new Array<PriceChange>();
        this.store = StoreService.getStore(this.url);
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
