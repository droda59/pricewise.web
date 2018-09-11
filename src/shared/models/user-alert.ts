import { AlertEntry } from "./alert-entry";

export class UserAlert implements IUserAlert {
    id: string;
    title: string;
    modifiedAt: Date;
    entries: Array<AlertEntry>;

    constructor();
    constructor(dto: IUserAlert);
    constructor(dto?: IUserAlert) {
        if (dto) {
            (<any>Object).assign(this, dto);

            this.modifiedAt = new Date(dto.modifiedAt);
            this.entries = dto.entries ? dto.entries.map(entryDto => new AlertEntry(entryDto)) : new Array<AlertEntry>();
        }
    }
}

interface IUserAlert {
    id: string;
    title: string;
    modifiedAt: Date;
    entries: Array<AlertEntry>;
}
