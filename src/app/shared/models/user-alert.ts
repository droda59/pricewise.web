import { Deal } from "./deal";
import { AlertEntry } from "./alert-entry";

export class UserAlert implements IUserAlert {
    id: string;
    title: string;
    imageUrl: string;
    isActive: boolean;
    isPortaitSize: boolean;
    isLandscapeSize: boolean;
    bestCurrentDeal: Deal;
    entries: Array<AlertEntry>;

    constructor();
    constructor(dto: IUserAlert);
    constructor(dto?: IUserAlert) {
        if (dto) {
            (<any>Object).assign(this, dto);

            this.bestCurrentDeal = new Deal(dto.bestCurrentDeal);
            this.entries = dto.entries ? dto.entries.map(entryDto => new AlertEntry(entryDto)) : new Array<AlertEntry>();

            var image = new Image(); 
            image.onload = () => {
                this.isPortaitSize = image.height > image.width;
                this.isLandscapeSize = image.height < image.width;
            };
            image.onerror = () => {
                image.onerror = null;
                this.imageUrl = "/images/pricewise-logo.png";
            };
            image.src = dto.imageUrl;
        }
    }
}

interface IUserAlert {
    id: string;
    title: string;
    imageUrl: string;
    isActive: boolean;
    bestCurrentDeal: Deal;
    entries: Array<AlertEntry>;
}