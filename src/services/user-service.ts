import { NewInstance, inject } from "aurelia-dependency-injection";
import { HttpClient, json } from "aurelia-fetch-client";
import { User } from "../models/user";
import { UserAlert } from "../models/user-alert";
import { UserSettings } from "../models/user-settings";

import { AlertEntry } from "../models/alert-entry";
import { Deal } from "../models/deal";

const fetchPolyfill = !self.fetch ? System.import("isomorphic-fetch") : Promise.resolve(self.fetch);

@inject(NewInstance.of(HttpClient))
export class UserService {
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
				.withBaseUrl("http://price-alerts-api.azurewebsites.net/api/user/");
		});
	}

	async get(userId: string): Promise<User> {
        await fetchPolyfill;

        const response = await this._httpClient.fetch(`${userId}`, {
			method: "get"
		});
		
        return new User(await response.json());
	}

	async update(user: User): Promise<User> {
        await fetchPolyfill;

        const response = await this._httpClient.fetch(`${user.userId}`, {
			method: "put",
			body: json(user)
		});

        return new User(await response.json());
	}

	async saveSettings(userId: string, settings: UserSettings): Promise<UserSettings> {
        await fetchPolyfill;

        const response = await this._httpClient.fetch(`${userId}/settings`, {
			method: "put",
			body: json(settings)
		});

        return new UserSettings(await response.json());
	}

	async create(user: User): Promise<User> {
        await fetchPolyfill;

        const response = await this._httpClient.fetch("", {
			method: "post",
			body: json(user)
		});

        return new User(await response.json());
	}
}
