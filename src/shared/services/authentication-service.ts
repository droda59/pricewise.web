import { NewInstance, inject } from "aurelia-dependency-injection";
import { HttpClient, json } from "aurelia-fetch-client";
import { AureliaConfiguration } from "aurelia-configuration";
import Auth0Lock from "auth0-lock";

const fetchPolyfill = !self.fetch ? System.import("isomorphic-fetch") : Promise.resolve(self.fetch);

@inject(NewInstance.of(HttpClient), AureliaConfiguration)
export class AuthenticationService {
    private _lock: Auth0LockStatic;
	private _configure: AureliaConfiguration;
	private _httpClient: HttpClient;

	constructor(httpClient: HttpClient, configure: AureliaConfiguration) {
		this._configure = configure;
        this._lock = new Auth0Lock(
            "7ICWS6d4sFffNPX02SN5BDcUHZsbOCv0",
            "price-alerts.auth0.com",
            {
                auth: {
                    redirect: false
                },
				autoclose: true,
				avatar: null,
				socialButtonStyle: "small",
				languageDictionary: {
					title: "PriceWise"
				},
				theme: {
					primaryColor: "#008179",
                    logo: `${configure.get("web")}images/pricewise-logo.png`
				},
            }
        );

		this._httpClient = httpClient.configure(config => {
			config
				.useStandardConfiguration()
				.withDefaults({
					headers: {
						"Accept": "application/json",
					}
				})
                .rejectErrorResponses()
				.withBaseUrl("https://price-alerts.auth0.com/oauth/");
		});
	}

	isAuthenticated(): boolean {
        return localStorage.getItem("user-id") !== null;
	}

	login(resultCallback: any): void {
        this._lock.on("authenticated", (authResult: any) => this.onAuthenticated(authResult, resultCallback));
        this._lock.show();
	}

	logout(): void {
        localStorage.removeItem("user-id");
        localStorage.removeItem("access-token");

        this._lock.logout({
            returnTo: this._configure.get("web")
        });
	}

    private onAuthenticated(authResult: any, resultCallback: any): void {
        this._lock.getUserInfo(authResult.accessToken, async (error: Auth0Error, profile: Auth0UserProfile) => {
			if (error) {
				return;
			}

			const token = await this.getToken();

			localStorage.setItem("access-token", token.access_token);
			localStorage.setItem("user-id", profile.user_id);

			if (resultCallback) {
				await resultCallback(profile);
			}
		});
    }

	private async getToken(): Promise<any> {
        await fetchPolyfill;

        const response = await this._httpClient.fetch("token", {
			method: "post",
			body: json({
				"client_id":"BWCrCxu7EhYDJx05x0jE4zJBBZr5vHlD",
				"client_secret":"8DGZlsuYLIzbtxaZbo009wZAvTYHt5tVQ0cbV7-Kz85aLBQ-gZp-7nH_X5aQArNT",
				"audience":"https://price-alerts.auth0.com/api/v2/",
				"grant_type":"client_credentials"
			})
		});

        return await response.json();
	}
}
