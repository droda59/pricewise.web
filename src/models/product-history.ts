export class ProductHistory implements IProductHistory {
    title: string;
    url: URL;
    priceHistory: Array<PriceChange>;

    constructor(dto: IProductHistory) {
        (<any>Object).assign(this, dto);

        this.url = new URL(dto.url);
        this.priceHistory = dto.priceHistory ? dto.priceHistory.map(changeDto => new PriceChange(changeDto)) : new Array<PriceChange>();
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