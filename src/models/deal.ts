export class Deal implements IDeal {
    price: number;
    productUrl: string;
    modifiedAt: Date;

    constructor(dto: IDeal) {
        (<any>Object).assign(this, dto);
    }
}

interface IDeal {
    price: number;
    productUrl: string;
    modifiedAt: Date;
}