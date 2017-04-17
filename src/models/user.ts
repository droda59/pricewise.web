import { UserAlert } from "./user-alert";

export class User implements IUser {
    id: string;
    name: string;
    email: string;
    alerts: Array<UserAlert>;

    constructor(dto: IUser) {
        (<any>Object).assign(this, dto);
        
        this.alerts = dto.alerts.map(alertDto => new UserAlert(alertDto));
    }
}

interface IUser {
    id: string;
    name: string;
    email: string;
    alerts: Array<UserAlert>;
}