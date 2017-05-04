import { Deal } from "./deal";
import { AlertEntry } from "./alert-entry";

export class UserAlert implements IUserAlert {
    id: string;
    title: string;
    imageUrl: string;
    isActive: boolean;
    lastModifiedDate: Date;
    lastModifiedAt: string;
    bestCurrentDeal: Deal;
    entries: Array<AlertEntry>;

    constructor();
    constructor(dto: IUserAlert);
    constructor(dto?: IUserAlert) {
        if (dto) {
            (<any>Object).assign(this, dto);

            this.lastModifiedDate = new Date(dto.lastModifiedAt);
            this.entries = dto.entries ? dto.entries.map(entryDto => new AlertEntry(entryDto)) : new Array<AlertEntry>();
        }
    }
}

interface IUserAlert {
    id: string;
    title: string;
    imageUrl: string;
    isActive: boolean;
    lastModifiedAt: string;
    bestCurrentDeal: Deal;
    entries: Array<AlertEntry>;
}