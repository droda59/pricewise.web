import { NewInstance, inject } from "aurelia-dependency-injection";
import { HttpClient, json } from "aurelia-fetch-client";
import { AureliaConfiguration } from "aurelia-configuration";
import { EventAggregator } from "aurelia-event-aggregator";
import { Router } from "aurelia-router";
import { UserService } from "../../app/shared/services/user-service";
import { User } from "../../app/shared/models/user";
import auth0 from "auth0-js";

const fetchPolyfill = !self.fetch ? System.import("isomorphic-fetch") : Promise.resolve(self.fetch);

@inject(NewInstance.of(HttpClient), AureliaConfiguration, Router, EventAggregator, UserService)
export class AuthenticationService {
	private _httpClient: HttpClient;
    private _router: Router;
    private _auth0: auth0.WebAuth;
    private _eventAggregator: EventAggregator;
    private _userService: UserService;

	constructor(httpClient: HttpClient, configure: AureliaConfiguration, router: Router, ea: EventAggregator, userService: UserService) {
        this._router = router;
        this._eventAggregator = ea;
        this._userService = userService;
        this._auth0 = new auth0.WebAuth({
            domain: "price-alerts.auth0.com",
            clientID: "7ICWS6d4sFffNPX02SN5BDcUHZsbOCv0",
            redirectUri: `${configure.get("web")}callback`,
            audience: "https://price-alerts.auth0.com/userinfo",
            responseType: "token id_token",
            scope: "openid profile email"
        });

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

    handleAuthentication() {
        this._auth0.parseHash(async (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                await this.setSession(authResult);

                var routeToNavigate = await this.getOrCreateUser(authResult.idTokenPayload);

                this._eventAggregator.publish("authChange", { authenticated: true });
                this._router.navigate(routeToNavigate);
            } else if (err) {
                console.log(err);
            }
        });
    }

    async setSession(authResult) {
        // Set the time that the access token will expire at
        let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());

        const token = await this.getToken();
        localStorage.setItem("access_token", token.access_token);
        localStorage.setItem("user_id", authResult.idTokenPayload.sub);
        localStorage.setItem("expires_at", expiresAt);
    }

	isAuthenticated(): boolean {
        // Check whether the current time is past the access token"s expiry time
        let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
        return new Date().getTime() < expiresAt;
	}

	login(): void {
        this._auth0.authorize();
	}

	logout(): void {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("expires_at");

        this._router.navigateToRoute("welcome");
        this._eventAggregator.publish("authChange", false);
	}

    private async getOrCreateUser(profile: any): Promise<string> {
        var user;
        var navigateTo = "user";

        try {
            user = await this._userService.get(profile.sub);
            if (!user.firstName) {
                navigateTo = "user/settings/account";
            }
        } catch(err) {
            if (err.status === 404) {
                var newUser = new User();
                newUser.userId = profile.sub;
                newUser.firstName = profile.given_name;
                newUser.lastName = profile.family_name;
                newUser.email = profile.email;

				if (!profile.given_name) {
					newUser.firstName = newUser.email;
                    navigateTo = "user/settings/account";
				}

                user = await this._userService.create(newUser);
            }
        }

        return navigateTo;
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
