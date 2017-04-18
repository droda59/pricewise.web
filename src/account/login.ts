import { autoinject } from "aurelia-framework";
import { AuthService } from "aurelia-authentication";

@autoinject()
export class Login{
    private _auth: AuthService;

    heading = "Login";
    email='';
    password='';
    providers = [];

    constructor(auth: AuthService){
        this._auth = auth;
    };

    async login(): Promise<void> {
        const response = await this._auth.login(this.email, this.password)
        
        console.log("success logged " + response);
    };

    async authenticate(name: string): Promise<void> {
        // const response = await this._auth.authenticate(name, false, null);
        
        // console.log("auth response " + response);

        const response = await this._auth.authenticate(name);
        this.providers[name] = true;
    }
}