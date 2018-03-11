import { Store } from "../models/store";
import { StoreService } from "../services/store-service";

export class Deal implements IDeal {
    price: number;
    originalUrl: string;
    productUrl: string;
    modifiedAt: Date;
    store: Store;

    constructor(dto: IDeal) {
        (<any>Object).assign(this, dto);

        this.modifiedAt = new Date(dto.modifiedAt);
        this.store = StoreService.getStore(this.originalUrl);
    }
}

interface IDeal {
    price: number;
    originalUrl: string;
    productUrl: string;
    modifiedAt: Date;
}
