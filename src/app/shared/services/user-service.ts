import { NewInstance, inject } from "aurelia-dependency-injection";
import { HttpClient, json } from "aurelia-fetch-client";
import { AureliaConfiguration } from "aurelia-configuration";
import { User } from "../models/user";
import { UserSettings } from "../../settings/models/user-settings";
import { AuthorizationInterceptor } from "../../../authorization-interceptor";

const fetchPolyfill = !self.fetch ? System.import("isomorphic-fetch") : Promise.resolve(self.fetch);

@inject(NewInstance.of(HttpClient), AureliaConfiguration, AuthorizationInterceptor)
export class UserService {
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
						.withBaseUrl(`${configure.get("api")}api/user/`);
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
