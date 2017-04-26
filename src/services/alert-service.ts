import { NewInstance, inject } from "aurelia-dependency-injection";
import { HttpClient, json } from "aurelia-fetch-client";
import { UserAlert } from "../models/user-alert";

const fetchPolyfill = !self.fetch ? System.import("isomorphic-fetch") : Promise.resolve(self.fetch);

@inject(NewInstance.of(HttpClient))
export class AlertService {
    private _httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this._httpClient = httpClient.configure(config => {
            config
                .useStandardConfiguration()
                .withDefaults({
                    headers: {
                        "Accept": "application/json",
                        "X-Requested-With": "Fetch"
                    }
                })
                .withInterceptor({
                    request(request)
                    {
                        if (request.headers.has("Authorization")) {
                            request.headers.delete("Authorization");
                        }

                        request.headers.append("Authorization", `Bearer ${localStorage.getItem('access-token')}`);
                        
                        return request;
                    }
                })
                .rejectErrorResponses()
                .withBaseUrl("http://localhost:5000/api/userAlerts/");
            });
	}

    async get(userId: string, alertId: string): Promise<UserAlert> {
        await fetchPolyfill;

        const response = await this._httpClient.fetch(`${userId}/${alertId}`, {
            method: "get"
        });
		
        return new UserAlert(await response.json());
    }

    async create(userId: string, uri: string): Promise<UserAlert> {
        await fetchPolyfill;

        const response = await this._httpClient.fetch(`${userId}`, {
            method: "post",
            body: json(uri)
        });

        return new UserAlert(await response.json());
    }

    async update(userId: string, alert: UserAlert): Promise<UserAlert> {
        await fetchPolyfill;

        const response = await this._httpClient.fetch(`${userId}`, {
            method: "put",
            body: json(alert)
        });

        return new UserAlert(await response.json());
    }

    async delete(userId: string, alertId: string): Promise<boolean> {
        await fetchPolyfill;

        const response = await this._httpClient.fetch(`${userId}/${alertId}`, {
            method: "delete"
        });
		
        return await response.json();
    }
}
