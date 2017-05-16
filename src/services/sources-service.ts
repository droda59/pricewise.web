import { Source } from "../models/source";

export class SourcesService {
    private _sources: Array<Source>;

    constructor() {
        this._sources = new Array<Source>();
        
        this._sources.push(this.createSource("Amazon", "amazon", "https://www.amazon.ca/", "rgb(254, 189, 105)"));
        this._sources.push(this.createSource("Best Buy", "src/images/bestbuy.png", "http://www.bestbuy.ca/", "rgb(255, 242, 0)"));
        this._sources.push(this.createSource("Staples", "staples", "http://www.staples.ca/", "rgb(204, 0, 0)"));
        this._sources.push(this.createSource("Toys R Us", "toysrus", "http://www.toysrus.ca/", "rgb(0, 86, 175)"));
        this._sources.push(this.createSource("Lego", "lego", "https://shop.lego.com/", "rgb(194, 4, 18)"));
        this._sources.push(this.createSource("Newegg", "newegg", "https://www.newegg.ca/", "rgb(247, 140, 27)"));
        this._sources.push(this.createSource("Tiger Direct", "tigerdirect", "http://www.tigerdirect.ca/", "rgb(254, 212, 67)"));
        this._sources.push(this.createSource("Renaud-Bray", "renaud-bray", "http://www.renaud-bray.com/", "rgb(46, 46, 46)"));
        this._sources.push(this.createSource("Archambault", "archambault", "http://www.archambault.ca/", "rgb(224, 0, 37)"));
        this._sources.push(this.createSource("Canadian Tire", "canadiantire", "http://www.canadiantire.ca/", "rgb(235, 40, 40)"));
    }

    get sources(): Array<Source> {
        return this._sources;
    }

    private createSource(name: string, domain: string, url: string, color: string): Source {
        return <Source> {
            name: name,
            domain: domain,
            url: url, 
            color: color
        };
    }
}