import { UserAlert } from "./user-alert";
import { UserSettings } from "../../settings/models/user-settings";

export class User implements IUser {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    settings: UserSettings;
    alerts: Array<UserAlert>;

    constructor();
    constructor(dto: IUser);
    constructor(dto?: IUser) {
        if (dto) {
            (<any>Object).assign(this, dto);
            
            this.alerts = dto.alerts ? dto.alerts.map(alertDto => new UserAlert(alertDto)) : new Array<UserAlert>();
            this.settings = new UserSettings(dto.settings);
        }
    }
}

interface IUser {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    settings: UserSettings;
    alerts: Array<UserAlert>;
}