import { lazy } from "aurelia-framework";
import { NewInstance, inject } from "aurelia-dependency-injection";
import { HttpClient, json } from "aurelia-fetch-client";
import { User } from "../models/user";

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
                .rejectErrorResponses()
				.withBaseUrl("http://localhost:5000/api/user/");
		});
	}

	async get(userId: string): Promise<User> {
        await fetchPolyfill;

        const response = await this._httpClient.fetch(`${userId}`, {
			method: "get"
		});
		
        return new User(await response.json());
	}

	async update(user: User): Promise<boolean> {
        await fetchPolyfill;

        const response = await this._httpClient.fetch(`${user.id}`, {
			method: "put",
			body: json(user)
		});

        return await response.json();
	}
}
