import { NewInstance, inject } from "aurelia-dependency-injection";
import { HttpClient, json } from "aurelia-fetch-client";
import { AureliaConfiguration } from "aurelia-configuration";
import { Store } from "../models/store";

@inject(NewInstance.of(HttpClient), AureliaConfiguration)
export class StoreService {
    private static _stores: Array<Store>;
    private _httpClient: HttpClient;

    constructor(httpClient: HttpClient, configure: AureliaConfiguration) {
        this._httpClient = httpClient.configure(config => {
            config
                .useStandardConfiguration()
                .withDefaults({
                    headers: {
                        "Accept": "application/json",
                        "X-Requested-With": "Fetch"
                    }
                })
                .rejectErrorResponses()
                .withBaseUrl(`${configure.get("api")}api/storeavailability/`);
            });
    }

    static initialize() {
        StoreService._stores = new Array<Store>();

        StoreService._stores.push(this.createStore("Amazon", "amazon-temp", "https://www.amazon.ca/", "rgb(254, 189, 105)"));
        StoreService._stores.push(this.createStore("Lego", "lego", "https://shop.lego.com/", "rgb(194, 4, 18)"));
        StoreService._stores.push(this.createStore("Toys R Us", "toysrus", "http://www.toysrus.ca/", "rgb(0, 86, 175)"));
        StoreService._stores.push(this.createStore("SAQ", "saq", "https://www.saq.com/", "rgb(122, 0, 60)"));
        // StoreService._stores.push(this.createStore("Walmart", "walmart", "https://www.walmart.ca/", "rgb(202, 100, 76)"));

        StoreService._stores.push(this.createStore("Sail", "sail", "https://www.sail.ca/", "rgb(228, 124, 57)"));
        StoreService._stores.push(this.createStore("MEC", "mec", "https://www.mec.ca/", "rgb(12, 169, 72)"));
        StoreService._stores.push(this.createStore("Sportium", "sportium", "https://www.sportium.ca/", "rgb(0, 152, 76)"));
        StoreService._stores.push(this.createStore("Sports Experts", "sportsexperts", "https://www.sportsexperts.ca/", "rgb(0, 72, 144)"));

        StoreService._stores.push(this.createStore("La Cordée", "lacordee", "https://www.lacordee.com/", "rgb(226, 0, 36)"));
        StoreService._stores.push(this.createStore("Best Buy", "bestbuy", "https://www.bestbuy.ca/", "rgb(255, 242, 0)"));
        StoreService._stores.push(this.createStore("401 Games", "401games", "https://store.401games.ca/", "rgb(150, 183, 119)"));
        StoreService._stores.push(this.createStore("Board Game Bliss", "boardgamebliss", "https://www.boardgamebliss.com/", "rgb(122, 70, 14)"));

        StoreService._stores.push(this.createStore("Indigo", "indigo", "https://www.chapters.indigo.ca/", "rgb(71, 42, 73)"));
        StoreService._stores.push(this.createStore("Carcajou", "carcajou", "http://www.librairiecarcajou.com/", "rgb(134, 0, 10)"));
        StoreService._stores.push(this.createStore("Archambault", "archambault", "https://www.archambault.ca/", "rgb(224, 0, 37)"));
        StoreService._stores.push(this.createStore("Renaud-Bray", "renaud-bray", "http://www.renaud-bray.com/", "rgb(46, 46, 46)"));

        StoreService._stores.push(this.createStore("Staples", "staples", "https://www.staples.ca/", "rgb(204, 0, 0)"));
        StoreService._stores.push(this.createStore("Tiger Direct", "tigerdirect", "http://www.tigerdirect.ca/", "rgb(254, 212, 67)"));
        StoreService._stores.push(this.createStore("Canadian Tire", "canadiantire", "http://www.canadiantire.ca/", "rgb(235, 40, 40)"));
        StoreService._stores.push(this.createStore("Ikea", "ikea", "http://www.ikea.com/ca/", "rgb(0, 51, 153)"));

        StoreService._stores.push(this.createStore("Leon's", "leons", "http://www.leons.ca/", "rgb(254, 242, 0)"));
        StoreService._stores.push(this.createStore("Brault & Martineau", "braultmartineau", "https://www.braultetmartineau.com/", "rgb(238, 46, 36)"));
        StoreService._stores.push(this.createStore("Home Depot", "homedepot", "https://www.homedepot.ca/", "rgb(243, 130, 49)"));
        StoreService._stores.push(this.createStore("Rona", "rona", "https://www.rona.ca/", "rgb(0, 46, 86)"));
    }

    get stores(): Array<Store> {
        return StoreService.storesLocal;
    }

    async getStores(): Promise<Array<Store>> {
        const availabilities = await this.getAvailability();
        var stores = StoreService.storesLocal;
        for (var i = 0; i < stores.length; i++) {
            var store = stores[i];
            var storeAvailability = availabilities.filter(availability => availability.domain == store.url);
            if (storeAvailability.length) {
                store.isAvailable = storeAvailability[0].isAvailable;
            }
        }

        return stores;
    }

    static getStore(url: string): Store {
        var allStores = this.storesLocal;

        for (var i = 0; i < allStores.length; i++) {
            if (url.includes(allStores[i].url)) {
                return allStores[i];
            }
        }

        return null;
    }

    private static get storesLocal(): Array<Store> {
        if (!this._stores) {
            this.initialize();
        }

        return this._stores;
    }

    private static createStore(name: string, domain: string, url: string, color: string): Store {
        return <Store> {
            name: name,
            domain: domain,
            url: url,
            color: color,
            isAvailable: true
        };
    }

    private async getAvailability(): Promise<Array<StoreAvailability>> {
        const response = await this._httpClient.fetch("", {
            method: "get"
        });

        return (<Array<any>>(await response.json())).map(x => new StoreAvailability(x));
    }
}

class StoreAvailability {
    domain: string;
    isAvailable: boolean;

    constructor();
    constructor(dto: StoreAvailability);
    constructor(dto?: StoreAvailability) {
        if (dto) {
            (<any>Object).assign(this, dto);
        }
    }
}
