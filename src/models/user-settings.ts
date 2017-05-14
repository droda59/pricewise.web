export class UserSettings {
    alertOnPriceDrop: boolean;
    alertOnPriceRaise: boolean;
    specifyChangePercentage: boolean;
    changePercentage: number;

    constructor(dto: IUserSettings) {
        (<any>Object).assign(this, dto);
    }
}

interface IUserSettings {
    alertOnPriceDrop: boolean;
    alertOnPriceRaise: boolean;
    specifyChangePercentage: boolean;
    changePercentage: number;
}