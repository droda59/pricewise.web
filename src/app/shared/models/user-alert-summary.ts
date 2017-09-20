import { Deal } from "./deal";

export class UserAlertSummary implements IUserAlertSummary {
    id: string;
    title: string;
    imageUrl: string;
    isActive: boolean;
    isPortaitSize: boolean;
    isLandscapeSize: boolean;
    bestCurrentDeal: Deal;

    constructor();
    constructor(dto: IUserAlertSummary);
    constructor(dto?: IUserAlertSummary) {
        if (dto) {
            (<any>Object).assign(this, dto);

            this.bestCurrentDeal = new Deal(dto.bestCurrentDeal);

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

interface IUserAlertSummary {
    id: string;
    title: string;
    imageUrl: string;
    isActive: boolean;
    bestCurrentDeal: Deal;
}
