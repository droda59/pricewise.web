import { UserAlert } from "./user-alert";

export class User implements IUser {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    alerts: Array<UserAlert>;

    constructor();
    constructor(dto: IUser);
    constructor(dto?: IUser) {
        if (dto) {
            (<any>Object).assign(this, dto);
            
            this.alerts = dto.alerts ? dto.alerts.map(alertDto => new UserAlert(alertDto)) : new Array<UserAlert>();
        }
    }
}

interface IUser {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    alerts: Array<UserAlert>;
}