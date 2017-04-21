// import { autoinject } from "aurelia-framework";
// import { WebAuth } from "auth0-js";
// import { UserService } from "../services/user-service";
// import { User } from "../models/user";

export class Login {
    // private _webAuth: WebAuth;
    // private _userService: UserService;

    heading = "Login";
    email: string = "";
    password: string = "";
    providers = [];

    // constructor(userService: UserService) {
    //     this._userService = userService;

    //     this._webAuth = new WebAuth({
    //         domain: "price-alerts.auth0.com",
    //         clientID: "7ICWS6d4sFffNPX02SN5BDcUHZsbOCv0"
    //     });
    // }

    // async login(): Promise<void> {
    // };

    // authenticate(name: string): void {
    //     var self = this;

    //     this._webAuth.authorize({
    //         connection: name
    //     });

    //     this._webAuth.parseHash(window.location.hash, function(err, authResult) {
    //         if (err) {
    //             return console.log(err);
    //         }

    //         this._webAuth.client.userInfo(authResult.accessToken, async function(err, user) {
    //             let repoUser: User;

    //             try {
    //                 repoUser = await self._userService.get(user.user_id);
    //             } catch(e) {
    //                 var newUser = new User();
    //                 newUser.userId = user.user_id;
    //                 newUser.firstName = user.given_name;
    //                 newUser.lastName = user.family_name;
    //                 newUser.email = user.email;

    //                 repoUser = await self._userService.create(newUser);
    //             }
    //         });
    //     });
    // }
}