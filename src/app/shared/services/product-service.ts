import { NewInstance, inject } from "aurelia-dependency-injection";
import { HttpClient, json } from "aurelia-fetch-client";
import { AureliaConfiguration } from "aurelia-configuration";
import { AuthorizationInterceptor } from "../../../authorization-interceptor";
import { ProductInfo } from "../models/product-info";

const fetchPolyfill = !self.fetch ? System.import("isomorphic-fetch") : Promise.resolve(self.fetch);

@inject(NewInstance.of(HttpClient), AureliaConfiguration, AuthorizationInterceptor)
export class ProductService {
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
                .withBaseUrl(`${configure.get("api")}api/product/`);
            });
	}

    async searchByProductIdentifier(productIdentifier: string): Promise<Array<ProductInfo>> {
        await fetchPolyfill;

        const response = await this._httpClient.fetch(`${productIdentifier}`, {
            method: "get"
        });
		
        return (<Array<any>>(await response.json())).map(x => new ProductInfo(x));
    }
}
