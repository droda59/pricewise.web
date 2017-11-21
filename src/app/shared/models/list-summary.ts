export class ListSummary implements IListSummary {
    id: string;
    name: string;

    constructor();
    constructor(dto: IListSummary);
    constructor(dto?: IListSummary) {
        if (dto) {
            (<any>Object).assign(this, dto);
        }
    }
}

interface IListSummary {
    id: string;
    name: string;
}
