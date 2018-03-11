import { HttpClient, json } from "aurelia-fetch-client";
import { AureliaConfiguration } from "aurelia-configuration";
import { NewInstance, inject } from "aurelia-dependency-injection";

@inject(NewInstance.of(HttpClient), AureliaConfiguration)
export class EmailNotificationService {
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
                .withBaseUrl(`${configure.get("api")}api/emailnotification/`);
            });
    }

    async deactivate(email: string, alertId: string): Promise<void> {
        await this._httpClient.fetch(`${email}/${alertId}/deactivate`, {
            method: "put"
        });
    }
}
