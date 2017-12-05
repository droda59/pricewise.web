import { NewInstance, inject } from "aurelia-dependency-injection";
import { HttpClient, json } from "aurelia-fetch-client";
import { AureliaConfiguration } from "aurelia-configuration";
import { List } from "../models/list";
import { AuthorizationInterceptor } from "../../../authorization-interceptor";

const fetchPolyfill = !self.fetch ? System.import("isomorphic-fetch") : Promise.resolve(self.fetch);

@inject(NewInstance.of(HttpClient), AureliaConfiguration, AuthorizationInterceptor)
export class ListService {
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
                .withBaseUrl(`${configure.get("api")}api/list/`);
            });
	}

    async get(userId: string, listId: string): Promise<List> {
        await fetchPolyfill;

        const response = await this._httpClient.fetch(`${userId}/${listId}`, {
            method: "get"
        });

        return new List(await response.json());
    }

    async getSummaries(userId: string): Promise<Array<List>> {
        await fetchPolyfill;

        const response = await this._httpClient.fetch(`${userId}`, {
            method: "get"
        });

        return (<Array<any>>(await response.json())).map(x => new List(x));
    }

    async create(userId: string, list: List): Promise<List> {
        await fetchPolyfill;

        const response = await this._httpClient.fetch(`${userId}`, {
            method: "post",
            body: json(list)
        });

        return new List(await response.json());
    }

    async update(userId: string, list: List): Promise<List> {
        await fetchPolyfill;

        const response = await this._httpClient.fetch(`${userId}`, {
            method: "put",
            body: json(list)
        });

        return new List(await response.json());
    }

    async delete(userId: string, listId: string): Promise<boolean> {
        await fetchPolyfill;

        const response = await this._httpClient.fetch(`${userId}/${listId}`, {
            method: "delete"
        });

        return await response.json();
    }
}
