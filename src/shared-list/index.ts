import { autoinject } from "aurelia-dependency-injection";
import { Router, RouterConfiguration } from "aurelia-router";
import { I18N } from "aurelia-i18n";
import { PLATFORM } from "aurelia-pal";
import { SharedListService } from "./services/shared-list-service";
import { Toaster } from "../shared/services/toaster";
import { UserAlertSummary } from "../shared/models/user-alert-summary";
import { ListService } from "../shared/services/list-service";
import { AuthenticationService } from "../shared/services/authentication-service";

@autoinject()
export class SharedListPage {
    private _i18n: I18N;
    private _sharedListService: SharedListService;
    private _authenticationService: AuthenticationService;
    private _listService: ListService;
    private _router: Router;
    private _toaster: Toaster;
    private _listId: string;
    private _userId: string;

    isAuthenticated: boolean;
    userName: string;
    listName: string;
    errorMessage: string;
    alerts: Array<UserAlertSummary> = [];

    constructor(
            sharedListService: SharedListService,
            listService: ListService,
            router: Router,
            authenticationService: AuthenticationService,
            toaster: Toaster,
            i18n: I18N) {
        this._userId = localStorage.getItem("user_id");

        this._i18n = i18n;
        this._router = router;
        this._sharedListService = sharedListService;
        this._listService = listService;
        this._authenticationService = authenticationService;
        this._toaster = toaster;
    }

    async activate(route, routeConfig): Promise<void> {
        this.isAuthenticated = this._authenticationService.isAuthenticated();

        if (route.listId) {
            this._listId = route.listId;

            try {
                const list = await this._sharedListService.get(this._listId);
                if (!list) {
                    throw new Error();
                }

                this.listName = list.name;
                this.userName = list.userName;
                this.alerts = list.alerts;

                routeConfig.navModel.title = this._i18n.tr("sharedLists.title", { listName: list.name, userName: list.userName });
            } catch(e) {
                if (e.status === 404) {
                    this.errorMessage = "lists.errors.notFound";
                } else if (e.status === 401) {
                    this.errorMessage = "lists.errors.unauthorized";
                }
            }
        }
    }

    async follow(): Promise<void> {
        if (this.isAuthenticated) {
            try {
                await this._listService.follow(this._userId, this._listId);

                this._toaster.showSuccess("sharedLists.listFollowed");

                if (this.isAuthenticated) {
                    this._router.navigateToRoute("alerts");
                }
            } catch(e) {
                var errorMessage = "";
                if (e.status === 404) {
                    errorMessage = "lists.errors.notFound_description";
                } else if (e.status === 401) {
                    this.errorMessage = "lists.errors.unauthorized_description";
                } else if (e.status === 400) {
                    errorMessage = "sharedLists.errors.cannotFollow";
                }

                this._toaster.showException("sharedLists.listFollowed", errorMessage);
            }
        }
    }

    navigateToSharedAlert(alert: UserAlertSummary): void {
        this._router.navigateToRoute("listalert", { alertId: alert.id, listId: this._listId });
    }
}
