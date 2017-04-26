export class Deal implements IDeal {
    price: number;
    title: string;
    productUrl: string;
    modifiedAt: Date;

    constructor(dto: IDeal) {
        (<any>Object).assign(this, dto);

        this.modifiedAt = new Date(dto.modifiedAt);
    }
}

interface IDeal {
    price: number;
    title: string;
    productUrl: string;
    modifiedAt: Date;
}