import { Source } from "../models/source";

export class SourcesService {
    private static _sources: Array<Source>;

    static initialize() {
        SourcesService._sources = new Array<Source>();
        
        SourcesService._sources.push(this.createSource("Amazon", "amazon", "https://www.amazon.ca/", "rgb(254, 189, 105)"));
        SourcesService._sources.push(this.createSource("Best Buy", "bestbuy", "http://www.bestbuy.ca/", "rgb(255, 242, 0)"));
        SourcesService._sources.push(this.createSource("Staples", "staples", "http://www.staples.ca/", "rgb(204, 0, 0)"));
        SourcesService._sources.push(this.createSource("Tiger Direct", "tigerdirect", "http://www.tigerdirect.ca/", "rgb(254, 212, 67)"));
        // SourcesService._sources.push(this.createSource("Newegg", "newegg", "https://www.newegg.ca/", "rgb(247, 140, 27)"));
        SourcesService._sources.push(this.createSource("Archambault", "archambault", "http://www.archambault.ca/", "rgb(224, 0, 37)"));
        SourcesService._sources.push(this.createSource("Renaud-Bray", "renaud-bray", "http://www.renaud-bray.com/", "rgb(46, 46, 46)"));
        SourcesService._sources.push(this.createSource("Indigo", "indigo", "https://www.chapters.indigo.ca/", "rgb(71, 42, 73)"));
        SourcesService._sources.push(this.createSource("Carcajou", "carcajou", "http://www.librairiecarcajou.com/", "rgb(134, 0, 10)"));
        SourcesService._sources.push(this.createSource("Canadian Tire", "canadiantire", "http://www.canadiantire.ca/", "rgb(235, 40, 40)"));
        SourcesService._sources.push(this.createSource("Sears", "sears", "http://www.sears.ca/", "rgb(0, 68, 149)"));
        SourcesService._sources.push(this.createSource("Leon's", "leons", "http://www.leons.ca/", "rgb(254, 242, 0)"));
        SourcesService._sources.push(this.createSource("Brault & Martineau", "braultmartineau", "http://www.braultetmartineau.com/", "rgb(238, 46, 36)"));
        SourcesService._sources.push(this.createSource("Toys R Us", "toysrus", "http://www.toysrus.ca/", "rgb(0, 86, 175)"));
        SourcesService._sources.push(this.createSource("Lego", "lego", "https://shop.lego.com/", "rgb(194, 4, 18)"));
    }

    get sources(): Array<Source> {
        return SourcesService.sourcesLocal;
    }

    static getSource(url: string): Source {
        var allSources = this.sourcesLocal;

        for (var i = 0; i < allSources.length; i++) {
            if (url.includes(allSources[i].url)) {
                return allSources[i];
            }
        }

        return null;
    }

    private static get sourcesLocal(): Array<Source> {
        if (!this._sources) {
            this.initialize();
        }

        return this._sources;
    }

    private static createSource(name: string, domain: string, url: string, color: string): Source {
        return <Source> {
            name: name,
            domain: domain,
            url: url, 
            color: color
        };
    }
}