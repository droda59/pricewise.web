import { Interceptor } from "aurelia-fetch-client";

export class AuthorizationInterceptor implements Interceptor {
    request(request) {
        if (request.headers.has("Authorization")) {
            request.headers.delete("Authorization");
        }

        request.headers.append("Authorization", `Bearer ${localStorage.getItem('access-token')}`);
        
        return request;
    }
}