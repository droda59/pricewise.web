import { AlertEntry } from "./alert-entry";

export class UserAlert implements IUserAlert {
    id: string;
    title: string;
    imageUrl: string;
    isActive: boolean;
    bestCurrentPrice: number;
    lastUpdate: Date;
    entries: Array<AlertEntry>;

    constructor();
    constructor(dto: IUserAlert);
    constructor(dto?: IUserAlert) {
        if (dto) {
            (<any>Object).assign(this, dto);

            this.entries = dto.entries.map(entryDto => new AlertEntry(entryDto));
        }
    }
}

interface IUserAlert {
    id: string;
    title: string;
    imageUrl: string;
    isActive: boolean;
    bestCurrentPrice: number;
    lastUpdate: Date;
    entries: Array<AlertEntry>;
}