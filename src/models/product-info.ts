import { Deal } from "./deal";
import { Source } from "./source";
import { SourcesService } from "../services/sources-service";

export class ProductInfo implements IProductInfo {
    originalUrl: string;
    productUrl: string;
    title: string;
    price: number;
    lastUpdate: Date;
    imageUrl: string;
    productIdentifier: string;
    isPortaitSize: boolean;
    isLandscapeSize: boolean;
    source: Source;

    constructor();
    constructor(dto: IProductInfo);
    constructor(dto?: IProductInfo) {
        if (dto) {
            (<any>Object).assign(this, dto);

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

            this.lastUpdate = new Date(dto.lastUpdate);
            this.source = SourcesService.getSource(this.originalUrl);
        }
    }
}

interface IProductInfo {
    originalUrl: string;
    productUrl: string;
    title: string;
    price: number;
    lastUpdate: Date;
    imageUrl: string;
    productIdentifier: string;
}