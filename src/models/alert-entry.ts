export class AlertEntry implements IAlertEntry {
    uri: string;
    lastPrice: number;
    lastUpdate: Date;
    isDeleted: boolean;

    constructor();
    constructor(dto: IAlertEntry);
    constructor(dto?: IAlertEntry) {
        if (dto) {
            (<any>Object).assign(this, dto);
        }
    }
}

interface IAlertEntry {
    uri: string;
    lastPrice: number;
    lastUpdate: Date;
    isDeleted: boolean;
}