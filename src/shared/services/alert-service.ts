import { NewInstance, inject } from "aurelia-dependency-injection";
import { HttpClient, json } from "aurelia-fetch-client";
import { AureliaConfiguration } from "aurelia-configuration";
import { ProductHistory } from "../models/product-history";
import { UserAlert } from "../models/user-alert";
import { UserAlertSummary } from "../models/user-alert-summary";
import { AuthorizationInterceptor } from "../../authorization-interceptor";

const fetchPolyfill = !self.fetch ? System.import("isomorphic-fetch") : Promise.resolve(self.fetch);

@inject(NewInstance.of(HttpClient), AureliaConfiguration, AuthorizationInterceptor)
export class AlertService {
    private _httpClient: HttpClient;

    constructor(httpClient: HttpClient, configure: AureliaConfiguration, interceptor: AuthorizationInterceptor) {
        this._httpClient = httpClient.configure(config => {
            config
                .useStandardConfiguration()
                .withDefaults({
                    headers: {
                        "Accept": "application/json",
                        "X-Requested-With": "Fetch"
                    }
                })
                .withInterceptor(interceptor)
                .rejectErrorResponses()
                .withBaseUrl(`${configure.get("api")}api/userAlerts/`);
            });
	}

    async get(userId: string, alertId: string): Promise<UserAlert> {
        await fetchPolyfill;

        const response = await this._httpClient.fetch(`${userId}/${alertId}`, {
            method: "get"
        });

        return new UserAlert(await response.json());
    }

    async getSummary(userId: string, alertId: string): Promise<UserAlertSummary> {
        await fetchPolyfill;

        const response = await this._httpClient.fetch(`${userId}/${alertId}/summary`, {
            method: "get"
        });

        return new UserAlertSummary(await response.json());
    }

    async getSummaries(userId: string): Promise<Array<UserAlertSummary>> {
        await fetchPolyfill;

        const response = await this._httpClient.fetch(`${userId}`, {
            method: "get"
        });

        return (<Array<any>>(await response.json())).map(x => new UserAlertSummary(x));
    }

    async getHistory(userId: string, alertId: string): Promise<Array<ProductHistory>> {
        await fetchPolyfill;

        const response = await this._httpClient.fetch(`${userId}/${alertId}/history`, {
            method: "get"
        });

        return (<Array<any>>(await response.json())).map(x => new ProductHistory(x));
    }

    async create(userId: string, uri: string): Promise<UserAlertSummary> {
        await fetchPolyfill;

        const response = await this._httpClient.fetch(`${userId}`, {
            method: "post",
            body: json(uri)
        });

        return new UserAlertSummary(await response.json());
    }

    async createEntry(userId: string, alertId: string, uri: string): Promise<UserAlert> {
        await fetchPolyfill;

        const response = await this._httpClient.fetch(`${userId}/${alertId}/entry`, {
            method: "post",
            body: json(uri)
        });

        return new UserAlert(await response.json());
    }

    async activate(userId: string, alertId: string, isActive: boolean): Promise<boolean> {
        await fetchPolyfill;

        const response = await this._httpClient.fetch(`${userId}/${alertId}/activate`, {
            method: "put",
            body: json(isActive)
        });

        return await response.json();
    }

    async update(userId: string, alert: UserAlert): Promise<UserAlert> {
        await fetchPolyfill;

        const response = await this._httpClient.fetch(`${userId}`, {
            method: "put",
            body: json(alert)
        });

        return new UserAlert(await response.json());
    }

    async updateSummary(userId: string, alert: UserAlertSummary): Promise<UserAlertSummary> {
        await fetchPolyfill;

        const response = await this._httpClient.fetch(`${userId}/summary`, {
            method: "put",
            body: json(alert)
        });

        return new UserAlertSummary(await response.json());
    }

    async delete(userId: string, alertId: string): Promise<boolean> {
        await fetchPolyfill;

        const response = await this._httpClient.fetch(`${userId}/${alertId}`, {
            method: "delete"
        });

        return await response.json();
    }
}
