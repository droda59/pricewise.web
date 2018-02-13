import { Source } from "../models/source";
import { SourcesService } from "../services/sources-service";

export class Deal implements IDeal {
    price: number;
    originalUrl: string;
    productUrl: string;
    modifiedAt: Date;
    source: Source;

    constructor(dto: IDeal) {
        (<any>Object).assign(this, dto);

        this.modifiedAt = new Date(dto.modifiedAt);
        this.source = SourcesService.getSource(this.originalUrl);
    }
}

interface IDeal {
    price: number;
    originalUrl: string;
    productUrl: string;
    modifiedAt: Date;
}
