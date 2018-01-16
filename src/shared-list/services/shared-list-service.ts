import { NewInstance, inject } from "aurelia-dependency-injection";
import { HttpClient, json } from "aurelia-fetch-client";
import { AureliaConfiguration } from "aurelia-configuration";
import { SharedList } from "../models/shared-list";
import { UserAlert } from "../../app/shared/models/user-alert";
import { UserAlertSummary } from "../../app/shared/models/user-alert-summary";
import { ProductHistory } from "../../app/shared/models/product-history";

const fetchPolyfill = !self.fetch ? System.import("isomorphic-fetch") : Promise.resolve(self.fetch);

@inject(NewInstance.of(HttpClient), AureliaConfiguration)
export class SharedListService {
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
                .withBaseUrl(`${configure.get("api")}api/sharedlist/`);
            });
	}

    async get(listId: string): Promise<SharedList> {
        await fetchPolyfill;

        const response = await this._httpClient.fetch(`${listId}`, {
            method: "get"
        });

        return new SharedList(await response.json());
    }

    async getAlertSummary(listId: string, alertId: string): Promise<UserAlertSummary> {
        await fetchPolyfill;

        const response = await this._httpClient.fetch(`${listId}/${alertId}/summary`, {
            method: "get"
        });

        return new UserAlertSummary(await response.json());
    }

    async getAlertDetails(listId: string, alertId: string): Promise<UserAlert> {
        await fetchPolyfill;

        const response = await this._httpClient.fetch(`${listId}/${alertId}`, {
            method: "get"
        });

        return new UserAlert(await response.json());
    }

    async getHistory(listId: string, alertId: string): Promise<Array<ProductHistory>> {
        await fetchPolyfill;

        const response = await this._httpClient.fetch(`${listId}/${alertId}/history`, {
            method: "get"
        });

        return (<Array<any>>(await response.json())).map(x => new ProductHistory(x));
    }
}
